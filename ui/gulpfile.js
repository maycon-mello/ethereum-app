/* global __dirname, process */
const gulp = require('gulp');
const rename = require('gulp-rename');
const awspublish  = require('gulp-awspublish');
const merge = require('merge-stream');
const replace = require('gulp-replace');
const cloudfront = require('gulp-cloudfront-invalidate-aws-publish');

// I'm going to disable invalidations for this test app
const cloudfrontInvalidations = false;

const publisherConf = {
  region: process.env.AWS_REGION,
  params: {
    Bucket: process.env.AWS_S3_BUCKET,
  },
};

const cloudfrontConf = {
  statics: {
    distribution: process.env.AWS_CLOUDFRONT_DISTRIBUTION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    wait: true,
  },
};

gulp.task('deploy:statics', () => {
  const publisher = awspublish.create(publisherConf);

  const jsStream = gulp.src(['./build/static/js/*'])
    .pipe(rename(path => {
      path.dirname = `/${process.env.APP_VERSION}/javascript`;
    }));

  const cssStream = gulp.src(['./build/static/css/*'])
    .pipe(rename(path => {
      path.dirname = `/${process.env.APP_VERSION}/stylesheet`;
    }));

  const sourceStream = merge(cssStream, jsStream)
    .pipe(awspublish.gzip());

  const imageStream = gulp.src(['./build/images/*'])
    .pipe(rename((path) => {
      path.dirname = `/${process.env.APP_VERSION}/images`;
    }));

  return merge(sourceStream, imageStream)
    .pipe(publisher.publish({
      'Cache-Control': 'max-age=315360000, no-transform, public',
      'Expires': new Date(Date.now() + 315360000),
    }))
    .pipe(awspublish.reporter());
});

gulp.task('deploy:index', () => {
  const publisher = awspublish.create(publisherConf);

  const indexStream = gulp.src(['./build/index.html'])
    .pipe(replace('/static/js/', `https://${process.env.AWS_CLOUDFRONT_DOMAIN_NAME}/javascript/`))
    .pipe(replace('/static/css/', `https://${process.env.AWS_CLOUDFRONT_DOMAIN_NAME}/stylesheet/`))
    .pipe(replace('/images/', `https://${process.env.AWS_CLOUDFRONT_DOMAIN_NAME}/images/`))
    .pipe(rename((path) => {
      path.dirname = `/${process.env.APP_VERSION}`;
    }))
    .pipe(awspublish.gzip());

  const filesStream = gulp.src([
    './build/*',
    '!./build/index.html',
    '!./build/images',
    '!./build/static',
  ])
  .pipe(rename((path) => {
    path.dirname = `/${process.env.APP_VERSION}`;
  }))

  let stream = merge(indexStream, filesStream)
    .pipe(publisher.publish({
      'Cache-Control': 'public, must-revalidate, proxy-revalidate, max-age=0',
    }));

  if (cloudfrontInvalidations) {
    stream = stream.pipe(cloudfront(cloudfrontConf.index));
  }

  stream.pipe(awspublish.reporter());
});

gulp.task('deploy', ['deploy:index', 'deploy:statics']);
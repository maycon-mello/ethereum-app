# The application
This app allow the user to create smart contracts by selecting some options. For example, a lottery contract, a contract to guess a number, and another one to donate money. Just the crud is implemented here, but the idea would be allow the users to interact with the contracts.

This is a very basic implementation, where contracts are created using web3 (i've tested with Rinkeby test network). A better approach would be using a contract to create the contracts, instead of deploying it manually in the frontend.

# The stack
I'm gonna describe the stack here and why I choose each technology, framework.

## Frontend

* Typescript, I don't feel confortable writing javascript without type checking, this is hard to maintain and to remember how to use the the code. For pure javascript projects I've used flowtype, this is good, but typescript is even easier and have a couple of OOTB features to structure better the code.
* React, I love react. I've started working with it since the first release and I feel very confortable writing components.
* Redux, I like to write functional stuff and i think this is aligned with elixir as well. It allows us to have an "entire" functional stack (we could replace Typescript with [Reason](https://github.com/facebook/reason) to have a really entire functional stack).
* Web3, to interact with ethereum blockchain (Metamask dependency)
* Mocha, chai, sinon, enzyme, jsdom for unit testing
* ESLint
* Puppeteer, for e2e tests. I've been using webdriver.io in some projects, this is better to test in different browsers (firefox, ie), but I decided to use puppeteer here since i like the api even with browsers limitations;
* There is a karma configuration in the project, i would use in a real app to test browser behavior. Using jsdom doesn't work very well for complicated DOM stuff, like rendering canvas, too much mouse interactions and so on.

## Backend

* Elixir, i choose elixir becauase it scales very well and i love the  "let it crash" philosophy, this is an awesome and powerful language on top of Erlang vm.
* Phoenix, actually it is not really necessary for such a small application, but by using phoenix it would be better to scale and create more features on top of this stack.
* GenServer: I've created a Store with GenServer to handle state, i would like to use dynamodb here but didn't have time.
* CoinApi: To fetch exchange rates, there is no cache on top of it since this is a very basic implementation. There are limited request count when using the free plan, so a cache would be really necessary here.

## Testing
* I've created unit tests for elixir api
* Frontend unit testing, and script to measure test coverage
* Unit tests for smart contracts, i've used ganache to mock it locally.
* E2E tests to the contract creation flow, should created test for other flows.

## Infrastructure

* EC2 instance for elixir api. I would configure ECS container since i'm already running in a docker container locally
* Cloudfront + S3 Bucket to serve frontend. There is no server side rendering, I would configure it for a production App.
* No database, Queues, Kubernetes, Lambda functions, Elasticsearch, Logging systems or any fancy stuff. To query data in the blockchain (fetch balnce for contracts in a scheduled job) and update DynamoDB I would use GenStages to create a producer/consumer architecture.

# What could I do to improve this app?

* Improve mobile experience.
* Refactor on typescript code to improve typing.
* Better documentation for Api, swagger file.
* Refactor smart contracts creation, the current implementation deploy contracts with web3. Could have a contract to create contracts and just perform a transaction instead of deploying it manually.
* Serve API through https
* Server side rendering for frontend
* Create service worker to provide a robust PWA
* Create scheduled process to get balance for contracts, I would use GenStages to query the blockchain
* Code spliting in the frontend
* Performance improvementes in frontend side, lighthouse measurements
* Improve deployment for API process
* Improve error handling in the frontend, can configure [sentry](https://sentry.io/welcome/) to log errors
* Better logs and monitoring for elixir api, we could use new relic here. Actually i've never used newrelic + elixir, just with java/scala, nodejs and Go applications. However seems that this adapter could be used, https://github.com/newrelic/elixir_agent (i'm gonna try it some day)
* Create DynamoDB infrastructure and elasticsearch to provide a robust search mechanism
* Implement login feature and user registration.
* Implement home page, and allow users to interact with contracts
* CI pipeline for deployments, we already have tests so it would not require too much effort.
* Better coverage for unit tests and e2e tests
* AWS ECS for api + Docker containers. I would use https://github.com/bitwalker/distillery to produce an Erlang/OTP release, it would be better for Elixir since we can deploy using hot swap.
* E2E tests for API's
* I might be missing something...

## If it had to handle huge traffics i would

* Break the exchange rate application in a separate container, the same for authentication and search
* Use kubernetes to handle the cluster
* Use load balancer on top of some appications (login, exchange rates, contracts, search), might have to think on how to handle cache. Not sure if cache would be realy necessary with this elixir api
* i think that's it for now :D

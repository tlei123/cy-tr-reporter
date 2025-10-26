# TestRail Reporter for Cypress

## ⚠️ Deprecation Notice

This project is no longer maintained or supported.

Please consider forking the repository or finding an alternative package that meets your needs. If someone is interested in taking over maintenance, feel free to open an issue to discuss.

## Description

cy-tr-reporter publishes [Cypress](https://www.cypress.io/) runs on [TestRail](https://www.gurock.com/testrail/).

NOTES:

- Use [Vivify-Ideas' cypress-testrail-reporter](https://github.com/Vivify-Ideas/cypress-testrail-reporter) first, before trying this repo here.
- This would've been a proper fork of Vivify-Ideas' repo, if I didn't need to actually fix their v1.2.3 for the recent breaking API changes from TestRail. _This repo_ started as an export of their repo at [v.1.2.3](https://github.com/Vivify-Ideas/cypress-testrail-reporter/commit/32ed9b8c47ff2150fd0af68950f186da4c3fc066).

## Install

```shell
npm install cy-tr-reporter --save-dev
```

or

```
yarn add cy-tr-reporter --dev
```

---

[Below is Vivify-Ideas\' original README content, with some udpates to Authors]

---

## Usage

Add reporter to your `cypress.json`:

```json
...
"reporter": "cy-tr-reporter",
"reporterOptions": {
  "host": "https://yourdomain.testrail.com",
  "username": "username",
  "password": "password",
  "projectId": 1,
  "suiteId": 1,
}
```

Your Cypress tests should include the ID of your TestRail test case. Make sure
your test case IDs are distinct from your test titles:

```Javascript
// Good:
it("C123 C124 Can authenticate a valid user", ...
it("Can authenticate a valid user C321", ...

// Bad:
it("C123Can authenticate a valid user", ...
it("Can authenticate a valid userC123", ...
```

## Reporter Options

**host**: _string_ host of your TestRail instance (e.g. for a hosted instance
_https://instance.testrail.com_).

**username**: _string_ email of the user under which the test run will be
created.

**password**: _string_ password or the API key for the aforementioned user. When
you set `CYPRESS_TESTRAIL_REPORTER_PASSWORD` in runtime environment variables,
this option would be overwritten with it.

**projectId**: _number_ project with which the tests are associated.

**suiteId**: _number_ suite with which the tests are associated.

**runName**: _string_ (optional) name of the Testrail run.

**includeAllInTestRun**: _bool_ (optional: default is true) will return all test
cases in test run. set to false to return test runs based on filter or
section/group.

**groupId**: _string_ (optional: needs "includeAllInTestRun": false ) The ID of
the section/group

**filter**: _string_ (optional: needs "includeAllInTestRun": false) Only return
cases with matching filter string in the case title

## TestRail Settings

To increase security, the TestRail team suggests using an API key instead of a
password. You can see how to generate an API key
[here](http://docs.gurock.com/testrail-api2/accessing#username_and_api_key).

If you maintain your own TestRail instance on your own server, it is recommended
to
[enable HTTPS for your TestRail installation](http://docs.gurock.com/testrail-admin/admin-securing#using_https).

For TestRail hosted accounts maintained by [Gurock](http://www.gurock.com/), all
accounts will automatically use HTTPS.

You can read the whole TestRail documentation [here](http://docs.gurock.com/).

## Authors

Tze-chiu Lei - [github](https://github.com/tlei123) - publisher of this repo.
Milutin Savovic - [github](https://github.com/mickosav) - author of the original cypress-testrail-reporter (see below).
Anes Topcic - [github](https://github.com/sakalaca) - author of the fix for API-response changes in recent TestRail 7.2 upgrade.

## License

This project is licensed under the [MIT license](/LICENSE.md).

## Acknowledgments

- [Vivify-Ideas](https://github.com/vivify-ideas), owner of the [cypress-testrail-reporter](https://github.com/vivify-ideas/cypress-testrail-reporter)
  repository, on which this project was based.

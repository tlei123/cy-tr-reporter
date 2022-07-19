"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CyTrReporter = void 0;
var mocha_1 = require("mocha");
var moment = require("moment");
var testrail_1 = require("./testrail");
var shared_1 = require("./shared");
var testrail_interface_1 = require("./testrail.interface");
var chalk = require('chalk');
var CyTrReporter = /** @class */ (function (_super) {
    __extends(CyTrReporter, _super);
    function CyTrReporter(runner, options) {
        var _this = _super.call(this, runner) || this;
        _this.results = [];
        var reporterOptions = options.reporterOptions;
        if (process.env.CY_TR_REPORTER_PASSWORD) {
            reporterOptions.password = process.env.CY_TR_REPORTER_PASSWORD;
        }
        _this.testRail = new testrail_1.TestRail(reporterOptions);
        _this.validate(reporterOptions, 'host');
        _this.validate(reporterOptions, 'username');
        _this.validate(reporterOptions, 'password');
        _this.validate(reporterOptions, 'projectId');
        _this.validate(reporterOptions, 'suiteId');
        runner.on('start', function () {
            var executionDateTime = moment().format('MMM Do YYYY, HH:mm (Z)');
            var name = (reporterOptions.runName || 'Automated test run') + " " + executionDateTime;
            var description = 'For the Cypress run visit https://dashboard.cypress.io/#/projects/runs';
            _this.testRail.createRun(name, description);
        });
        runner.on('pass', function (test) {
            var _a;
            var caseIds = (0, shared_1.titleToCaseIds)(test.title);
            if (caseIds.length > 0) {
                var results = caseIds.map(function (caseId) {
                    return {
                        case_id: caseId,
                        status_id: testrail_interface_1.Status.Passed,
                        comment: "Execution time: " + test.duration + "ms",
                        elapsed: test.duration / 1000 + "s",
                    };
                });
                (_a = _this.results).push.apply(_a, results);
            }
        });
        runner.on('fail', function (test) {
            var _a;
            var caseIds = (0, shared_1.titleToCaseIds)(test.title);
            if (caseIds.length > 0) {
                var results = caseIds.map(function (caseId) {
                    return {
                        case_id: caseId,
                        status_id: testrail_interface_1.Status.Failed,
                        comment: "" + test.err.message,
                    };
                });
                (_a = _this.results).push.apply(_a, results);
            }
        });
        runner.on('end', function () {
            if (_this.results.length == 0) {
                console.log('\n', chalk.magenta.underline.bold('(TestRail Reporter)'));
                console.warn('\n', 'No testcases were matched. Ensure that your tests are declared correctly and matches Cxxx', '\n');
                _this.testRail.deleteRun();
                return;
            }
            // publish test cases results & close the run
            _this.testRail
                .publishResults(_this.results)
                .then(function () { return _this.testRail.closeRun(); });
        });
        return _this;
    }
    CyTrReporter.prototype.validate = function (options, name) {
        if (options == null) {
            throw new Error('Missing reporterOptions in cypress.json');
        }
        if (options[name] == null) {
            throw new Error("Missing " + name + " value. Please update reporterOptions in cypress.json");
        }
    };
    return CyTrReporter;
}(mocha_1.reporters.Spec));
exports.CyTrReporter = CyTrReporter;
//# sourceMappingURL=cy-tr-reporter.js.map
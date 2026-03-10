"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jasmine_spec_reporter_1 = require("jasmine-spec-reporter");
const reporter = new jasmine_spec_reporter_1.SpecReporter({
    spec: {
        displaySuccessful: true,
        displayFailed: true,
        displayPending: true,
        displayDuration: true,
    },
    summary: {
        displaySuccessful: true,
        displayFailed: true,
        displayDuration: true,
    },
});
jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(reporter);

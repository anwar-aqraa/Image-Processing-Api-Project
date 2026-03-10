import { SpecReporter } from "jasmine-spec-reporter";

const reporter: SpecReporter = new SpecReporter({
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

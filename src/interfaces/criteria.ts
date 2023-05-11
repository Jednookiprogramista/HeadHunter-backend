export interface Criteria {
  values: {
    courseEngagement?: number;
    courseCompletion?: number;
    projectDegree?: number;
    teamProjectDegree?: number;
    expectedTypeWork?: string[];
    expectedContractType?: string[];
    expectedSalary?: {
      min?: number;
      max?: number;
    };
    canTakeApprenticeship?: boolean | string;
    monthsOfCommercialExp?: number;
  };
}

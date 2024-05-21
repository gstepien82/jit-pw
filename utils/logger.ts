import { Logger } from 'tslog';

const loggerConfig: any = {
  type: 'pretty',
  minLevel: process.env.LOG_LEVEL ?? 'info',
  printLogMessageInNewLine: false,
  displayDateTime: true,
  displayLogLevel: true,
  displayInstanceName: false,
  displayRequestId: false,
  displayFilePath: 'hideNodeModulesOnly',
  displayFunctionName: true,
  displayTypes: false,
  maskValuesOfKeys: ['password'],
  colorizePrettyLogs: true,
  prefix: [],
};

export const _logger = new Logger(loggerConfig);

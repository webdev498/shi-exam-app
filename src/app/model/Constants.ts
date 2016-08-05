import {ENV_PROVIDERS} from './../../platform/environment';

export const RootApiUrl = ENV_PROVIDERS.API_HOST;
export const UserTokenKey = 'userToken';
export const UserInfoKey = 'userInfo';
export const RegistrationStartInfo = 'rsStartInfo';
export const YoungestAgeFromCurrent = 14;
export const YearsAvailable = 100;
export const PasswordMinLength = 8;
export const AuthHeaderKey = 'Authorization';
export const NationalitiesKey = 'Nationalalties';

//exam constants
export const ExamStartParam = 'exam';
export const ExamShort = 'short';
export const ExamNormal = 'normal';
export const ExamLong = 'long';
export const ExamProgress = 'examprogress';

//question constants
export const MultipleChoiceQuestionType = '1';
export const MatchingQuestionType = '2';
export const GroupingQuestionType = '3';
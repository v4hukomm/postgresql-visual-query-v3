import { bannedWords } from './bannedWords';

export const validateSql = (sqlString) => {
  const lowerCaseSql = sqlString.toLowerCase().split(' ');
  const invalidKeywords = bannedWords.filter(keyword => keyword !== 'select' && lowerCaseSql.includes(
    keyword,
  ));
  
  return true;
  return !invalidKeywords.length > 0;
};

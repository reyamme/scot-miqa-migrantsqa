const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

/**
 * This is used for testing the Client<->API connection, but this operation
 * won't be allowed in the final version of the project as it is a
 * security risk to expose all users
 */

const getAllQuestions = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select  questions.id, questions.content, questions.tags, users.username,
                questions.date_posted, questions.user_id 
		            from questions 
                INNER JOIN users ON users.id = questions.user_id
                order by questions.date_posted desc limit 10`,
      (error, result) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(result.rows);
        }
      }
    );
  });
};

const insertQuestions = (
  content,
  date_posted,
  tags,
  is_answered,
  score,
  user_id
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO questions (content,date_posted ,tags,is_answered ,score,user_id)
       VALUES($1, $2, $3, $4, $5, $6)
       `,
      [content, date_posted, tags, is_answered, score, user_id],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result.rows);
      }
    );
  });
};

const updateQuestions = (content, date_posted, id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `update questions set content=$1,date_posted=$2 where id=$3`,
      [content, date_posted, id],
      (error, result) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(result.rows);
        }
      }
    );
  });
};
const deleteQuestions = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `delete from questions where questions.id=$1`,
      [id],
      (error, result) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(result.rows);
        }
      }
    );
  });
};

const insertAnswer = (
  content,
  dateAnswered,
  tags,
  isAccepted,
  score,
  questionId,
  userId
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO answers (content,date_answered ,tags,is_accepted ,
        score,question_id,user_id)
                        VALUES($1, $2, $3, $4, $5, $6, $7)
                        `,
      [content, dateAnswered, tags, isAccepted, score, questionId, userId],
      (error, result) => {
        if (error) {
          return reject(error);
        } else {
          resolve(result.rows);
        }
      }
    );
  });
};

module.exports = {
  getAllQuestions,
  updateQuestions,
  insertQuestions,
  deleteQuestions,
  insertAnswer
};

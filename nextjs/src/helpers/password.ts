import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = (password: string) => {
  return new Promise<string>(function (resolve, reject) {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) {
        reject(err);
      } else {
        resolve(hash)
      }
    })
  });
}

export const mathPassword = (password: string, hash: string) => {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(password, hash, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result)
      }
    })
  });
}

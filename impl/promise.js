import { create as _create } from "../../utils.js";

/**
 * promise 实现
 * 要编写符合规范的promise，有几点是比较重要的
 * 1. resolve和reject必须是异步任务，使用setTimeout模拟
 * 2. then必须返回promise，如果onfulfill和onreject没有返回promise，需要构造一个返回
 * 3. 当then执行时机promise处于pending状态，应当使用一个callback数组，在外部调用resolve的时候，统一执行onfulfill
 * 
 */
const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

function isFunction(any) {
  return typeof any === "function";
}
class Promise {
  /**
   *
   * @param {(resolve: (value: any) => {}, reject: (reason: any) => {}) => {}} exec
   */
  constructor(exec) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onfulfilled = [];
    this.onrejected = [];
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = RESOLVED;
        this.value = value;
        this.onfulfilled.forEach((callback) => callback(value));
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onrejected.forEach((callback) => callback(reason));
      }
    };
    try {
      exec(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onfulfilled, onrejected) {
    onfulfilled = isFunction(onfulfilled) ? onfulfilled : (value) => value;
    onrejected = isFunction(onrejected)
      ? onrejected
      : (reason) => {
          throw reason;
        };
    if (this.status === PENDING) {
      return new Promise((resolve, reject) => {
        this.onfulfilled.push((value) => {
          setTimeout(() => {
            try {
              let res = onfulfilled(value);
              if (res instanceof Promise) {
                res.then(resolve, reject);
              } else {
                resolve(res);
              }
            } catch (e) {
              reject(e);
            }
          });
        });
        this.onrejected.push((reason) => {
          setTimeout(() => {
            try {
              let res = onrejected(reason);
              if (res instanceof Promise) {
                res.then(resolve, reject);
              } else {
                reject(res);
              }
            } catch (e) {
              reject(e);
            }
          });
        });
      });
    } else if (this.status === RESOLVED) {
      // then 应该返回一个promise
      return new Promise((resolve, reject) => {
        // onfulfilled应该是微任务
        setTimeout(() => {
          try {
            let res = onfulfilled(this.value);
            if (res instanceof Promise) {
              res.then(resolve, reject);
            } else {
              resolve(res);
            }
          } catch (e) {
            reject(e);
          }
        });
      });
    } else if (this.status === REJECTED) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            let res = onrejected(this.reason);
            if (res instanceof Promise) {
              res.then(resolve, reject);
            } else {
              reject(res);
            }
          } catch (e) {
            reject(e);
          }
        });
      });
    }
  }

  static resolve(value) {
    return new Promise((resolve) => {
      resolve(value)
    })
  }
  static reject(reason) {
    return new Promise((_, reject) => {
      reject(reason)
    })
  }

}

Promise.resolve(1).then((res) => console.log(res));

new Promise((resolve, _) => {
  resolve(1);
}).then((res) => {
  result2 = res;
  console.log(result2)
});

new Promise((_, reject) => {
  reject(1);
}).then(
  () => {},
  (res) => {
    result3 = res;
    console.log(res)
  }
);

new Promise((resolve, _) => {
  setTimeout(() => {
    resolve(1)
  })
}).then((result) => {
  return new Promise((resolve, _) => {
    resolve(result);
  })
}).then((result) => console.log(result))

const template = `
  <div>
    <h1>Promise</h1>
    <p>
      Promise.resolve(1).then(res => console.log(res))<br/>
      expect: 1<br/>
      result: see console
    </p>
    <p>
      new Promise((resolve, reject) => {
        resolve(1)
      }) .then(res => console.log(res))<br/>
      expect: 1<br/>
      result: see console
    </p>
    <p>
      new Promise((resolve, reject) => {
        reject(1)
      }).then(_, rej => console.log(rej))<br/>
      expect: 1<br/>
      result: see console
    </p>
    <p>
      new Promise((resolve, _) => {
        setTimeout(() => {
          resolve(1)
        })
      }).then((result) => {
        return new Promise((resolve, _) => {
          resolve(result);
        })
      }).then((result) => console.log(result))<br/>
      expect: 1<br/>
      result: see console
    </p>
  </div>

`;
export default function create() {
  _create(template);
}

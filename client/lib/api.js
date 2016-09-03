import {Promise} from 'when'

// From https://shellmonger.com/2015/03/24/promises-and-ajax-in-ecmascript-6/
function makeAjaxRequest({method, url, body, transforms = []}) {
  return new Promise(function(resolve, reject) {
    let req = new XMLHttpRequest()
    req.open(method.toUpperCase(), url)

    transforms.forEach(transform => transform(req))

    req.onload = function() {
      if (req.status === 200) {
        resolve(req.response)
      } else {
        reject(new Error(req.response || req.statusText))
      }
    }

    req.onerror = function() {
      reject(new Error("Network error"))
    }

    req.send(body)
  })
}

export const get = url => makeAjaxRequest({url, method: 'get'})

export const post = (url, body) => makeAjaxRequest({
  url,
  method: 'post',
  body: JSON.stringify(body),
  transforms: [req => req.setRequestHeader("Content-Type", "application/json;charset=UTF-8")]
})

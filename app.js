const Url = require('./db').Url;
const validUrl = require('valid-url');
const shortid = require('shortid');


const addUrl = (url_param, done) => {
    if (validUrl.isHttpUri(url_param) || validUrl.isHttpsUri(url_param)) {
        const url = Url({
            original_url: url_param,
            short_url: shortid.generate()
        });
        url.save(
            (err, data) => {
                if (err) console.log({error: 'Error occured'});
                else {
                    console.log({success: 'Successsss!! ' + JSON.stringify(data, null, 3)});

                    done(null, data);
                }
            }
        );
    } else {
      done(null, {error: 'invalid url'});
    }

    // console.log('JSONURL: ' + JSON.stringify(jsonUrl, null, 3));
}

const findByShortId = (short_url_, done) => {
    Url.findOne({short_url: short_url_}, (err, url) => {
        if (err) {
            console.log('Url not found');
            //return {error: 'Url not found by short url'}
        } else {
            console.log('Url found: \n' + JSON.stringify(url));
            done(null, url)
            //return url;
        }
    });
}

exports.addUrl = addUrl;
exports.findByShortId = findByShortId;
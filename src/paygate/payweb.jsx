import React, {Component} from 'react';
import Md5 from 'blueimp-md5'
import {asString} from 'date-format';

class PayWeb extends Component {

    render() {
        return (<div>
            <button onClick={e=> this.func(e)}>Pay</button>
        </div>)
    }

    func = (event)=> {
        console.log(event);
        let encryptionKey = 'secret';
        let timestamp = new Date();
        /*
        curl --location --request POST 'https://secure.paygate.co.za/payweb3/initiate.trans' \
--form 'PAYGATE_ID=10011072130' \
--form 'REFERENCE=pgtest_123456789' \
--form 'AMOUNT=3299' \
--form 'CURRENCY=ZAR' \
--form 'RETURN_URL=https://my.return.url/page' \
--form 'TRANSACTION_DATE=2018-01-01 12:00:00' \
--form 'LOCALE=en-za' \
--form 'COUNTRY=ZAF' \
--form 'EMAIL=customer@paygate.co.za' \
--form 'CHECKSUM=59229d9c6cb336ae4bd287c87e6f0220'
         */
        let data = {
            'PAYGATE_ID'        : 10011072130,
            'REFERENCE'         : 'pgtest_123456789',
            'AMOUNT'            : 3299,
            'CURRENCY'          : 'ZAR',
            'RETURN_URL'        : 'https://ndeoligence.github.io/paygate-demo',
            'TRANSACTION_DATE'  : this.fmt(new Date()),
            'LOCALE'            : 'en-za',
            'COUNTRY'           : 'ZAF',
            'EMAIL'             : 'customer@paygate.co.za',
        };
        let av = Object.values(data);
        console.log(`Values: ${av}`);
        let str = av.join('');
        let vs =
            str === '10011072130pgtest_1234567893299ZARhttps://nwpub.herokuapp.com/pubs2018-01-01 12:00:00en-zaZAFcustomer@paygate.co.za'?
            'Good': 'Fail';
        console.log(`DataString: ${vs}`)
        let checksum = Md5(str + encryptionKey);
        data['CHECKSUM'] = checksum;
        vs = checksum === '59229d9c6cb336ae4bd287c87e6f0220'? 'Good': 'Fail';
        console.log(`Checksum: ${vs}`);
        if (checksum !== '59229d9c6cb336ae4bd287c87e6f0220') {
            console.log(`Expected: 59229d9c6cb336ae4bd287c87e6f0220`);
            console.log(`Actual  : ${checksum}`);
        }
        console.log(`Data:`);
        console.log(data);
        console.log('POSTING...');
        this.postData('https://secure.paygate.co.za/payweb3/initiate.trans', data).then(response=> {
            console.log(`Response data:\n${response}`);
            console.log('OKANYE...');
            console.log(response);
            console.log(response.headers);
            console.log(response.statusText);
            return response.text();
        }).then(txt=> {
            console.log(`Response text: ${txt}`);
        });
    }

    fmt = (date)=> {
        return asString('yyyy-MM-dd hh:mm:ss', date);
    }

    async postData(url = '', data = {}) {
        // Default options are marked with *
         // parses JSON response into native JavaScript objects
        return await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
    }

}

export default PayWeb;

/**
 * Created by chenqingbiao on 16/7/5.
 */
import Storage from 'react-native-storage';

const key = 'bd7a9faf17f449b7a3bd622eee3e4f87';

var storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,

    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: 1000 * 3600 * 24,

    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,

    // 如果storage中没有相应数据，或数据已过期，
    // 则会调用相应的sync同步方法，无缝返回最新数据。
    sync : {
        weather(params) {
            let { id, resolve, reject } = params;
            console.log("********************");
            let cityid = id.split(".")[0];
            let url = 'https://api.heweather.com/x3/weather?cityid='+cityid+'&key='+key;
            fetch(url)
                .then((response) => response.json())
                .then((json) => {
                    if(json){
                        storage.save({
                            key: 'weather',
                            id,
                            rawData: json
                        });
                        // 成功则调用resolve
                        resolve && resolve(json);
                    }
                    else{
                        // 失败则调用reject
                        reject && reject(new Error('data parse error'));
                    }
                }).catch(err => {
                    reject && reject(err);
                }).done();
        }
    }
});

global.storage = storage;

module.exports.storage = storage;


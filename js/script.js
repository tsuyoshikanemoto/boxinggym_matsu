var paramKey = 'keyword'; // 検索キーワードとして取得するパラメータのキー
var jsonPath = 'data.json'; // 記事情報のjsonのパス
var jsonKeys = ['title', 'fghter','class','date','url','result','place']; // 検索対象にするjson内のキー
var output = "#js-search-result"; // 検索対象にするjson内のキー
 
$(function(){
    // URLからキーワードを取得
    var s = get_search_keywords(paramKey);
 
    if(s) {
        // ajaxで記事情報を取得
        $.ajax({
            url: jsonPath,
            cache: false
        })
        .then(
            function (data) {
                console.log(data)
                // キーワードに一致する記事情報のインデックスを取得
                var index = keyword_search(data, s, jsonKeys);
                if(index.length >0) {
                    // 検索結果一覧を生成
                    generate_result(data, index);
                } else {
                    alert('キーワードに一致する記事がありませんでした。');
                }
            },
            function () {
                console.log('取得に失敗しました。');
            }
        );
    } else {
        // alert('キーワードが入力されていません。');
    }
});
 
 
/**
 * 検索に使用するキーワードを取得する
 * キーワードがない場合はfalseを返す
 * @param {string} key (required) パラメータのkey
 */
function get_search_keywords(key) {
    // URLからパラメータ取得
    var params = [];
    var param = location.search.substring(1).split('&');
    for(var i = 0; i < param.length; i++) {
        params[i] = param[i].split('=');
    }
    // キーワードを配列形式で格納
    var keywords = [];
    var separator =(/ |　|\+/g);
    for(var i = 0; i < params.length; i++) {
        if(params[i][0] === key && params[i][1] !== undefined) {
            keywords = decodeURIComponent(params[i][1]).split(separator);
            break;
        }
    }
    // キーワードの値が空のものを除去
    keywords = keywords.filter(function(e){ return e !== ''; });
    // キーワードがない場合はfalseを返す
    if(keywords.length <= 0) {
        return false;
    }
    // キーワードを小文字に変換
    for(var i = 0; i < keywords.length; i++) {
        keywords[i] = keywords[i].toLowerCase();
    }
    return keywords;
}
 
/**
 * 記事内のキーワード検索
 * @param {object} articleData (required) 検索する記事情報
 * @param {array}  keywords    (required) 検索するキーワード
 * @param {array}  jsonKeys    (required) 検索対象にする記事情報のキー
 */
function keyword_search(articleData, keywords, jsonKeys) {
    var data = articleData['data'];
    var h = [];
    // 検索対象の値を配列にまとめる
    for (var i = 0; i < data.length; i++) {
        var v = [];
        for (var j = 0; j < jsonKeys.length; j++) {
            var thisVal = data[i][jsonKeys[j]];
            // 値が配列の場合はその各値を取得
            if(Array.isArray(thisVal)) {
                for (var k = 0; k < thisVal.length; k++) {
                    v.push(thisVal[k].toLowerCase());
                }
            } else {
                v.push(thisVal.toLowerCase());
            }
        }
        h.push(v);
    }
 
    // 一致する配列のindexを取得
    var matchIndex = [];
    var matchCount;
    var thisArr;
    // 各記事のループ
    for (var i = 0; i < h.length; i++) {
        matchCount = 0;
        thisArr = h[i];
        // 検索キーワードでのループ
        for (var j = 0; j < keywords.length; j++) {
            // 記事の各項目でのループ
            for (var k = 0; k < thisArr.length; k++) {
                // 記事項目内に検索キーワードが含まれる場合
                if(thisArr[k].indexOf(keywords[j]) > -1) {
                    matchCount++;
                    break;
                }
            }
            // 検索キーワードが各項目に含まれなかった場合
            if(matchCount <= j) {
                break;
            }
            // 検索キーワードが全て記事に含まれていた場合
            if(matchCount >= keywords.length) {
                matchIndex.push(i);
            }
        }
    }
    return matchIndex;
}
 
/**
 * 検索に一致した記事で検索結果を生成
 * @param {object} articleData (required) 検索する記事情報
 * @param {array}  index       (required) 検索に一致する記事情報のindex
 */
 function jump(){
    window.location.href= urls ;
  }
function generate_result(articleData, index) {
    var data = articleData['data'];
    var ins = '';
    for (var i = 0; i < index.length; i++) {
        var t = index[i];
        ins = ins + '<div class="article">';
            ins += '<h3 class="article_title">'; //ins = '' + '<h3 class="article_title">'
                ins += data[t]['title'];
            ins += '</h3>';
            ins += '<p class="article_place">';
            ins +='会場:'
            ins += data[t]['place'];
            ins += '<p>';
            ins += '<p class="article_class">';
            ins += '階級:'
            ins += data[t]['class'];
            ins += '</p>';
            ins += '<p class="article_date">';
            ins += '開催日:'
            ins += data[t]['date'];
            ins += '</p>';
            ins +='<div class="result-list">'
            ins += '<div class="result">';
            ins +=  '<p class="article_body">';
            ins += data[t]['fghter'];
            ins += '</p>';
            ins += '<p class="article_date">';
            ins += '判定:';
            ins += data[t]['result'];
            ins += '</p>';
            ins += '<p class="article_date">';
            ins += '勝者:';
            ins += data[t]['winner'];
            ins += '</p>';
           ins +='</div>' ;
            urls =  data[t]['url'];
            console.log(urls)
            ins +=  '<a href="javascript:void(0);" onclick="jump();">';
            ins += '試合映像はこちら'
            ins += '</a>';
            ins +='</div>'

            // ins += '<ul class="article_categorie">';
            //     for(var j = 0; j < data[t]['categorie'].length; j++) {
            //         ins += '<li>' + data[t]['categorie'][j] + '</li>';
            //     }
            // ins += '</ul>';
        ins += '</div>';
    }
    $(output).html(ins);
}

 


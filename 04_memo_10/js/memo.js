"use strict";
//ページ本体が読み込まれたタイミングで実行するコード
document.addEventListener("DOMContentLoaded",
    function () {
        //1.localStorageが読み込まれたタイミングで実行するコード
        if (typeof localStorage === "undefined") {
            window.alert("このブラウザはLocal Storage機能が実装されていません");
            return;
        } else {
            viewStorage();          //localStorageからデータ取得とテーブルへ表示
            saveLocalStorage();     //2.localStorageへの保存
            delLocalStorage();      //3.localStorageから1件削除
            allClearLocalStorage(); //4.localStorageから全て件削除
            selectTable();          //5.データ選択
        }
    }
);

//2.localStorageへの保存
function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click",
        function (e) {
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;

            //値の入力チェック
            if (key == "" || value == "") {
                Swal.fire({
                    title: "Memo app"//タイトルをここに定義
                    , html: "Key、Memoはいずれも必須です。" //メッセージ内容をここに定義
                    , type: "error"
                    , allowOutsideClick: false
                });

                return;
            } else {
                let w_msg = "LocalStorageに\n「" + key + " " + value + "」を保存しますか？";
                Swal.fire({
                    title: "Memo app"
                    , html: w_msg
                    , type: "question"
                    , showCancelButton: true
                }).then(function (result) {
                    if (result.value === true) {
                        localStorage.setItem(key, value);
                        viewStorage();
                        let w_msg = "LocalStorageに\n「" + key + " " + value + "」\nを保存しました。";
                        Swal.fire({
                            title: "Memo-app"//タイトルをここに定義
                            , html: w_msg //メッセージ内容をここに定義
                            , type: "success"
                            , allowOutsideClick: false
                        });
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                });

            }

        }, false
    );

};

//3.localStorageから選択されている行を件削除
function delLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click",
        function (e) {
            e.preventDefault();//選択されていれば、"1"が返却される
            const chkbox1 = document.getElementsByName("chkbox1");
            const table1 = document.getElementById("table1");
            let w_cnt = 0;
            w_cnt = selectCheckBox("del");

            if (w_cnt >= 1) {
                let w_msg = "LocalStorageから選択されている" + w_cnt + "件を削除しますか？";
                Swal.fire({
                    title: "Memo app"//タイトルをここに定義
                    , html: w_msg //メッセージ内容をここに定義
                    , type: "question"
                    , showCancelButton: true
                }).then(function (result) {
                    if (result.value === true) {
                        for (let i = 0; i < chkbox1.length; i++) {
                            if (chkbox1[i].checked) {
                                localStorage.removeItem(table1.rows[i + 1].cells[1].firstChild.data);
                            }
                        }
                        viewStorage();
                        let w_msg = "LocalStorageから " + w_cnt + " 件を削除しました。";
                        Swal.fire({
                            title: "Memo-app"
                            , html: w_msg
                            , type: "success"
                            , allowOutsideClick: false
                        });
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                });
            }
        }, false
    );
};

//4.localStorageから全て件削除
function allClearLocalStorage() {
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_msg = "LocalStorageのデータを全て削除(all clear)します。\nよろしいですか？";
            Swal.fire({
                title: "Memo app",
                html: w_msg,
                type: "question",
                showCancelButton: true
            }).then(function (result) {
                if (result.value === true) {
                    localStorage.clear();
                    viewStorage(); // localStorageからの取得とテーブルへ表示
                    let w_msg = "LocalStorageのデータを全て削除(all clear)しました。";
                    Swal.fire({
                        title: "Memo app",
                        html: w_msg,
                        type: "success",
                        allowOutsideClick: false
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });
        },
    );
};

//5.データ選択
function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click",
        function (e) {
            e.preventDefault();
            selectCheckBox("select");
        }, false
    );
};
const table1 = document.getElementById("table1");
table1.addEventListener("click", (e) => {
    if (e.target.classList.contains("trash") === true) {
        let index = e.target.parentNode.parentNode.rowIndex
        const key = table1.rows[index].cells[1].firstChild.data;
        const value = table1.rows[index].cells[2].firstChild.data;
        let w_delete = "LocalStorageから\n「" + key + " " + value + "」\nを削除いますか?";
        Swal.fire({
            title: "Memo app"//タイトルをここに定義
            , html: w_delete //メッセージ内容をここに定義
            , type: "question"
            , showCancelButton: true

        }).then(result => {
            if (result.value === true) {
                localStorage.removeItem(key);
                viewStorage();
                let w_msg = "LocalStorageに\n「" + key + " " + value + "」\nを削除しました!";
                Swal.fire({
                    title: "Memo-app"
                    , html: w_msg
                    , type: "success"
                    , allowOutsideClick: false
                });
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        })
    }
});
//テーブルから選択
function selectCheckBox(mode) {
    // let w_sel = "0"; //選択されていれば"１"にする
    let w_cnt = 0;
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");

    let w_textKey = "";
    let w_textMemo = "";

    for (let i = 0; i < chkbox1.length; i++) {
        if (chkbox1[i].checked) {
            if (w_cnt === 0) {
                w_textKey = table1.rows[i + 1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i + 1].cells[2].firstChild.data;
                //return w_sel = "1";
            }
            w_cnt++;
        }
    }
    document.getElementById("textKey").value = w_textKey;
    document.getElementById("textMemo").value = w_textMemo;

    if (mode === "select") {
        if (w_cnt === 1) {
            return w_cnt;
        }

        else {
            Swal.fire({
                title: "Memo app",
                html: "1つ選択してください。",
                type: "error",
            })
        }
    }
    //削除ボタンを押されたときのチェックロジック
    if (mode === "del") {
        if (w_cnt >= 1) {
            return w_cnt;
        }

        else {
            Swal.fire({
                title: "Memo app",
                html: "1つ以上選択(select) してください。",
                type: "error",
            })
        }
    }
};




//localStorageからデータ取得とテーブルへ表示
function viewStorage() {
    const list = document.getElementById("list");
    // htmlのテーブル初期化
    while (list.rows[0]) list.deleteRow(0);

    //localStorageすべての情報の取得
    for (let i = 0; i < localStorage.length; i++) {
        let w_key = localStorage.key(i);

        //localStorageからデータ取得とテーブルへ表示
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        td1.innerHTML = "<input name='chkbox1' type = 'checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
        td4.innerHTML = "<img src='img/trash_icon.png' class='trash'>";
    }

    //jQueryのplugin tablesorterを使ってテーブルのノート
    // sortList: ひきす1...最初からノートしておく列を指定、引数...0...昇順,降順
    $("#table1").tablesorter({      //tablesort add
        sortList: [[1, 0]]           //tablesort add
    });
    $("#table1").trigger("update");  //tablesort add                        //tablesort add
};

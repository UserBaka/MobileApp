'use strict';

// ワークエリア
var wkFirst = "1"; // 初回FLG
var wkTotal = 0;  // 合計
var wkInput = ""; // 現在クリックされたボタンの値
var wkCalc = "+"; // 初期値 "+"
var wkBefore = "1"; // １つ前の入力 … 0:数値  1:演算子

// ページ上の要素（Element)を参照
const elementcalcLog = document.getElementById("calcLog");    // ログ出力エリア
const elementResult = document.getElementById("result");      // 結果表示エリア

// 定数を定義
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const num3 = document.getElementById("num3");
const num4 = document.getElementById("num4");
const num5 = document.getElementById("num5");
const num6 = document.getElementById("num6");
const num7 = document.getElementById("num7");
const num8 = document.getElementById("num8");
const num9 = document.getElementById("num9");
const num0 = document.getElementById("num0");

const elementAdd = document.getElementById("add");
const elementSub = document.getElementById("sub");
const elementMult = document.getElementById("mul");
const elementDiv = document.getElementById("div");

const elementEqual = document.getElementById("equal");
const elementCancel = document.getElementById("cancel");

// イベントを登録
num1.addEventListener("click", function () { edit("1") });
num2.addEventListener("click", function () { edit("2") });
num3.addEventListener("click", function () { edit("3") });
num4.addEventListener("click", function () { edit("4") });
num5.addEventListener("click", function () { edit("5") });
num6.addEventListener("click", function () { edit("6") });
num7.addEventListener("click", function () { edit("7") });
num8.addEventListener("click", function () { edit("8") });
num9.addEventListener("click", function () { edit("9") });
num0.addEventListener("click", function () { edit("0") });


elementAdd.addEventListener("click", function () { update("+") });
elementSub.addEventListener("click", function () { update("-") });
elementMult.addEventListener("click", function () { update("*") });
elementDiv.addEventListener("click", function () { update("/") });

elementEqual.addEventListener("click", dspResult);
elementCancel.addEventListener("click", clear);

/** 数字がクリックされたときの処理 */
function edit(wkInput) {
    // １つ前の入力が数値
    if (wkBefore === "0") {
        elementResult.innerHTML = Number(elementResult.innerHTML + wkInput); // 入力値の結合（ゼロサプレスして結合）
    }
    // １つ前の入力が、演算子
    else {
        elementResult.innerHTML = wkInput;
    }
    wkFirst = "0"; // 初回FLG off
    wkBefore = "0";
}

/** 演算子がクリックされたときの処理 */
function update(calcType) {
    // １つ前の入力が数値
    if (wkBefore === "0") {
        elementcalcLog.innerHTML = elementcalcLog.innerHTML + Number(elementResult.innerHTML) + calcType;
        calculator();
    }
    // １つ前の入力が演算子（演算子 入力しなおし）
    else {
        // 初回入力
        if (wkFirst === "1") {
            elementcalcLog.innerHTML = "0" + calcType; // 計算ログ
        }
        else {
            // 演算子 入力しなおし
            let wkLogLastWord = elementcalcLog.innerHTML.slice(-1); // ログ最後の１文字
            if (["+", "-", "*", "/"].includes(wkLogLastWord)) {
                elementcalcLog.innerHTML = elementcalcLog.innerHTML.slice(0, -1) + calcType; // 計算ログ　末尾1文字（前回の演算子）を削除
            }
            // イコールの後の演算子
            else {
                elementcalcLog.innerHTML = elementcalcLog.innerHTML + calcType; // 計算ログ
            }
        }
    }
    wkCalc = calcType;  // 演算子save
    wkBefore = "1";
}

/** =がクリックされたときの処理 */
function dspResult() {
    // 条件に当てはまる場合に処理を実行
    if (wkFirst === "0" && wkBefore === "0") {
        // ログ出力エリアに、現在のログと結果表示エリアの値を連結してセット
        elementcalcLog.innerHTML = elementcalcLog.innerHTML + Number(elementResult.innerHTML);

        // 計算処理を実行
        calculator();

        // フラグ設定
        wkCalc = "=";  // 演算子の退避
        wkBefore = "1"; // 1つ前の入力を演算子に設定
    }
}

/** 計算結果をクリアします。 (clear) */
function clear() {
    elementResult.innerHTML = "0";       // 結果表示エリアをゼロクリア
    elementcalcLog.innerHTML = "";      // ログ出力エリアをクリア
    wkTotal = 0;                        // 合計をゼロクリア
    wkFirst = "1";                      // 初回FLGを初期状態に設定
    wkCalc = "+";                       // 演算子退避エリアを初期値に設定
    wkBefore = "1";                     // 1つ前の入力を演算子に設定
}
function calculator() {
    switch (wkCalc) {
        case "+":
            wkTotal = Number(wkTotal) + Number(elementResult.innerHTML);
            break;
        case "-":
            wkTotal = Number(wkTotal) - Number(elementResult.innerHTML);
            break;
        case "*":
            wkTotal = Number(wkTotal) * Number(elementResult.innerHTML);
            break;
        case "/":
            wkTotal = Number(wkTotal) / Number(elementResult.innerHTML);
            break;

    }
    elementResult.innerHTML = wkTotal;
}

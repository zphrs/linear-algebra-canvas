//! Test suite for the Web and headless browsers.

#![cfg(target_arch = "wasm32")]

extern crate wasm_bindgen_test;
use std::assert_eq;

use wasm_bindgen_test::*;
// import the generated wasm binding
use js_sys;
use linear_algebra::{m1_op_to_matrix, matrix_to_js_array};
use peroxide::fuga::*;
use wasm_bindgen::prelude::*;

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
#[test]
fn test_m1_op_to_matrix() {
    let m1 = py_matrix(vec![vec![1.0, 3.0], vec![2.0, 4.0]]);
    let m1_inv = py_matrix(vec![vec![-2.0, 1.5], vec![1.0, -0.5]]);
    let m1_rref = py_matrix(vec![vec![1.0, 0.0], vec![0.0, 1.0]]);
    let m1_transpose = py_matrix(vec![vec![1.0, 2.0], vec![3.0, 4.0]]);
    let js_array = matrix_to_js_array(m1);
    // clone the js array so we can use it twice
    let js_array2 = js_array.clone();
    let js_array3 = js_array.clone();

    let js_array_inv = m1_op_to_matrix(js_array, "inv").unwrap();
    let js_array_rref = m1_op_to_matrix(js_array2, "rref").unwrap();
    let js_array_transpose = m1_op_to_matrix(js_array3, "transpose").unwrap();

    assert_eq!(
        js_array_inv.to_string(),
        matrix_to_js_array(m1_inv).to_string()
    );
    assert_eq!(
        js_array_rref.to_string(),
        matrix_to_js_array(m1_rref).to_string()
    );
    assert_eq!(
        js_array_transpose.to_string(),
        matrix_to_js_array(m1_transpose).to_string()
    )
}

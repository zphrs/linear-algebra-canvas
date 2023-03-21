mod utils;

use js_sys::{Array, Number};
use peroxide::fuga::*;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, linear-algebra!");
}

// fn matrix_to_ml_string(matrix: Matrix) -> String {
//     let vector = matrix.to_vec();
//     let out = vector
//         .iter()
//         .map(|row| {
//             row.iter()
//                 .map(|value| value.to_string())
//                 .collect::<Vec<String>>()
//                 .join(" ")
//         })
//         .collect::<Vec<String>>()
//         .join("; ");
//     out
// }

pub fn matrix_to_js_array(matrix: Matrix) -> Array {
    // returns array of arrays
    let vector = matrix.to_vec();
    let js_array = Array::new();
    for row in vector {
        let js_row = Array::new();
        for value in row {
            js_row.push(&JsValue::from_f64(value));
        }
        js_array.push(&js_row);
    }
    js_array
}

pub fn js_array_to_matrix(array: Array) -> Result<Matrix, JsValue> {
    Ok(py_matrix(
        array
            .iter()
            .map(|value| {
                // convert value to a vector without using serde
                Array::from(&value)
                    .iter()
                    .map(|value| {
                        value.as_f64().ok_or_else(|| {
                            JsValue::from("Invalid input: matrix must be a 2D array of numbers")
                        })
                    })
                    .collect::<Result<Vec<f64>, JsValue>>()
            })
            .collect::<Result<Vec<Vec<f64>>, JsValue>>()?,
    ))
}

#[wasm_bindgen]
pub fn m1_op_to_matrix(m1: Array, op: &str) -> Result<Array, JsValue> {
    // convert m1 into a vector of vectors
    let m1 = m1
        .iter()
        .map(|value| {
            // convert value to a vector without using serde
            Array::from(&value)
                .iter()
                .map(|value| {
                    value.as_f64().ok_or_else(|| {
                        JsValue::from("Invalid input: matrix must be a 2D array of numbers")
                    })
                })
                .collect::<Result<Vec<f64>, JsValue>>()
        })
        .collect::<Result<Vec<Vec<f64>>, JsValue>>()?;
    let m = py_matrix(m1);
    let out = match op {
        "rref" => m.rref(),
        "inv" => {
            if m.row != m.col {
                return Err("Only square matricies can be inversed".into());
            }
            m.inv()
        }
        "transpose" => m.transpose(),
        _ => m,
    };
    Ok(matrix_to_js_array(out))
}

#[wasm_bindgen]
pub fn m1_op_m2_to_matrix(m1: &str, m2: &str, op: &str) -> Result<Array, JsValue> {
    // support addition, subtraction, multiplication
    let m1 = ml_matrix(m1);
    let m2 = ml_matrix(m2);
    let out = match op {
        "+" => m1 + m2,
        "-" => m1 - m2,
        "*" => m1 * m2,
        _ => Err(JsValue::from(format!(r#"Invalid operation: {op}"#)))?,
    };
    Ok(matrix_to_js_array(out))
}

#[wasm_bindgen]
pub fn m1_det(m1: &str) -> Result<Number, JsValue> {
    let m = ml_matrix(m1);
    if m.row != m.col {
        return Err("Only square matricies have a determinant".into());
    }
    Ok(m.det().into())
}

#[wasm_bindgen]
pub fn m1_op_float_to_matrix(m1: &str, op: &str, f: f64) -> Result<Array, JsValue> {
    let m = ml_matrix(m1);
    let out = match op {
        "*" => m * f,
        "/" => m / f,
        _ => Err(JsValue::from(format!(r#"Invalid operation: {op}"#)))?,
    };
    Ok(matrix_to_js_array(out))
}

import fetch from 'node-fetch';

async function run() {
  try {
    const fetchRes = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnT4yxiAJSNALWCSrobRnVunP2XNcAnEzLRbwfU3r3gX_ZiGLoR2RfptVDLtWtSx9QWLwy8gwpdy8PS_eOksfk7AT4znqj8FklOIG8Dn0BJ2kgbTXw6cngUJrUNf-Szl4K_bKbuwsoSW1n_EEiMcq5hMu1NIvhxcFKv5dHq1gzCX3F6Xk0YVLr8qwLiRxVTbF2gg0YUYSBn5_HV6CqGnieRvl5VloeofikhICgFT2l1z_1saiCQGDV_0i8hRIVucQtcKqfrwcRDUiy5x5KljxkhA82cVfA&lib=MoWq_hOq9sHK5EytQwLFlVmZXvhknfx_y");
    const data = await fetchRes.json();
    console.log(JSON.stringify(data).substring(0, 500));
  } catch (e) {
    console.error("Error:", e);
  }
}
run();

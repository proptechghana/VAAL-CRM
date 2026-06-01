const fetchLive = async () => {
    const res = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnTSF9hA58hN-n4py6-1d5NoNAsTmBbtKqf3NnyH9Rv0rf5f338i99Kj1vSjzFELjcUJP0hEg5228mf-Yxl-iAHq3_Ul0_alTuvJb4EzQENAxenGjYSJyqGu4gSmJ_AybjLzAr1KTYpI31eLrpZAj5cq4bKD2Fx6YSkooYTWD9AROOx_WA1SaQKoWjL4nvZmFeRfzV24D5D5dTYEeJFwg_vIno4hjFSvaRF-Zah3KNGuwthMrih-gjo2IPYrx4bsr9JvZExXVY5Hzeswr2_VOEzfs_Vn7Q&lib=M_f8uKnVMGWa9e8wad5DzK-jFj4EQ-TUW");
    const data = await res.json();
    console.log(JSON.stringify(data.slice(0, 5), null, 2));
}
fetchLive();

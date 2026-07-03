const Keunggulan = {
    init: function() {
        const urlParams = new URLSearchParams(window.location.search);
        const keunggulanId = parseInt(urlParams.get('id'));

        if (!keunggulanId) {
            window.location.href = '03-index.html';
            return;
        }

        const dataKeunggulan = window.keunggulanData.find(k => k.id === keunggulanId);

        if (!dataKeunggulan) {
            window.location.href = '03-index.html';
            return;
        }

        this.renderDetail(dataKeunggulan);
    },

    renderDetail: function(data) {
        document.title = `Keunggulan - ${data.title}`;
        document.getElementById('detail-title').innerText = data.title;
        
        const imgEl = document.getElementById('detail-image');
        imgEl.src = data.image;
        imgEl.style.display = 'block';

        document.getElementById('detail-desc1').innerText = data.desc1;
        document.getElementById('detail-desc2').innerText = data.desc2;

        const pointsEl = document.getElementById('detail-points');
        pointsEl.innerHTML = '';
        data.points.forEach(point => {
            const li = document.createElement('li');
            li.innerHTML = point;
            pointsEl.appendChild(li);
        });

        // Spesifikasi 1
        document.getElementById('spec1-icon').className = `fas ${data.spec1_icon} text-blue`;
        document.getElementById('spec1-label').innerText = data.spec1_label;
        document.getElementById('spec1-value').innerText = data.spec1_value;

        // Spesifikasi 2
        document.getElementById('spec2-icon').className = `fas ${data.spec2_icon} text-blue`;
        document.getElementById('spec2-label').innerText = data.spec2_label;
        const spec2Val = document.getElementById('spec2-value');
        spec2Val.innerText = data.spec2_value;
        if (data.spec2_color) spec2Val.style.color = data.spec2_color;

        // Spesifikasi 3
        document.getElementById('spec3-icon').className = `fas ${data.spec3_icon} text-blue`;
        document.getElementById('spec3-label').innerText = data.spec3_label;
        document.getElementById('spec3-value').innerText = data.spec3_value;

        // Status bar
        const statusEl = document.getElementById('detail-status');
        statusEl.innerText = data.statusText;
        statusEl.style.backgroundColor = data.statusBg;
    }
};

document.addEventListener('DOMContentLoaded', function() {
    Keunggulan.init();
});

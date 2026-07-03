const TimKami = {
    init: function() {
        this.renderTim();
    },

    renderTim: function() {
        const container = document.getElementById('team-container');
        if (!container) return;

        const timData = window.timData || [];

        if (timData.length === 0) {
            container.innerHTML = '<div style="text-align: center; grid-column: 1 / -1; padding: 40px; color: #94a3b8;">Belum ada data anggota tim.</div>';
            return;
        }

        container.innerHTML = '';

        timData.forEach(anggota => {
            const memberCard = document.createElement('div');
            memberCard.className = 'member-card';

            memberCard.innerHTML = `
                <img src="${anggota.foto}" alt="${anggota.nama}" class="member-img">
                <h4 class="member-name">${anggota.nama} <br> ${anggota.jabatan}</h4><br>
                <span class="member-role">${anggota.peran}</span>
                <p class="member-desc">${anggota.deskripsi}</p>
            `;

            container.appendChild(memberCard);
        });
    }
};

document.addEventListener('DOMContentLoaded', function() {
    TimKami.init();
});

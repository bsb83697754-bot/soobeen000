// Landing Page Interactive Scripts
document.addEventListener('DOMContentLoaded', () => {
    // Add basic interactive features, for example clicking on navigation links
    const navLinks = document.querySelectorAll('.nav-links div');

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            // Remove active class from all
            navLinks.forEach(n => n.classList.remove('active-link'));
            // Add active class to clicked
            this.classList.add('active-link');
        });
    });

    // Guestbook form handling
    const gbForm = document.getElementById('gb-form');
    if (gbForm && window.supabase) {
        const SUPABASE_URL = 'https://rjyazfdwcxocsowtjwhh.supabase.co';
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqeWF6ZmR3Y3hvY3Nvd3Rqd2hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzOTkyOTksImV4cCI6MjA5MTk3NTI5OX0.FGeo-gXz8crmg811tD_OXkQfHBwAxEGXe8UqhDD23OA';
        const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        const list = document.getElementById('gb-entries-list');

        const loadEntries = async () => {
            const { data, error } = await supabase
                .from('guestbook')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Error fetching guestbook entries:", error);
                return;
            }

            list.innerHTML = '';
            if (data.length === 0) {
                list.innerHTML = `<div class="gb-entry"><span class="gb-entry-msg">방명록이 비어있습니다. 첫 번째 방명록을 남겨주세요!</span></div>`;
            } else {
                data.forEach(item => {
                    const entry = document.createElement('div');
                    entry.className = 'gb-entry';
                    
                    const nameSpan = document.createElement('span');
                    nameSpan.className = 'gb-entry-name';
                    nameSpan.textContent = item.name;
                    
                    const msgSpan = document.createElement('span');
                    msgSpan.className = 'gb-entry-msg';
                    msgSpan.textContent = item.message;

                    entry.appendChild(nameSpan);
                    entry.appendChild(msgSpan);
                    list.appendChild(entry);
                });
            }
        };

        loadEntries();

        gbForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nameEl = document.getElementById('gb-name');
            const msgEl = document.getElementById('gb-msg');
            const btn = gbForm.querySelector('button');
            const name = nameEl.value;
            const message = msgEl.value;

            btn.disabled = true;
            btn.textContent = 'Submitting...';

            const { error } = await supabase
                .from('guestbook')
                .insert([{ name, message }]);

            if (error) {
                console.error("Error inserting data:", error);
                alert("방명록 등록 중 오류가 발생했습니다. 테이블 생성이 완료되었는지 확인해주세요.");
            } else {
                nameEl.value = '';
                msgEl.value = '';
                loadEntries();
            }

            btn.disabled = false;
            btn.textContent = 'Submit';
        });
    }

    console.log("Scripts loaded successfully!");
});

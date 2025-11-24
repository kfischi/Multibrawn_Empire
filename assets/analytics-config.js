// ═══════════════════════════════════════════════════════════
// MULTIBRAWN - Analytics & Tracking Configuration
// ═══════════════════════════════════════════════════════════

// ────────────────────────────────────────────────────────────
// 1. GOOGLE ANALYTICS 4 (GA4)
// ────────────────────────────────────────────────────────────
// Replace 'G-XXXXXXXXXX' with your actual GA4 Measurement ID

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX', {
    'send_page_view': true,
    'anonymize_ip': true
});

// Custom Events Tracking
const trackEvent = (eventName, eventParams = {}) => {
    gtag('event', eventName, eventParams);
};

// Track WhatsApp clicks
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href*="wa.me"]').forEach(btn => {
        btn.addEventListener('click', () => {
            trackEvent('whatsapp_click', {
                'event_category': 'contact',
                'event_label': 'whatsapp_button'
            });
        });
    });
    
    // Track Contact Form submissions
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            trackEvent('form_submit', {
                'event_category': 'contact',
                'event_label': 'contact_form'
            });
        });
    }
    
    // Track Chatbot interactions
    window.trackChatbotEvent = (action, label) => {
        trackEvent('chatbot_interaction', {
            'event_category': 'chatbot',
            'event_label': label,
            'event_action': action
        });
    };
    
    // Track Gallery views
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            trackEvent('gallery_view', {
                'event_category': 'engagement',
                'event_label': this.dataset.category || 'unknown'
            });
        });
    });
});

// ────────────────────────────────────────────────────────────
// 2. FACEBOOK PIXEL
// ────────────────────────────────────────────────────────────
// Replace 'YOUR_PIXEL_ID' with your actual Facebook Pixel ID

!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');

fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');

// Facebook Custom Events
window.trackFBEvent = (eventName, params = {}) => {
    fbq('track', eventName, params);
};

// Track Lead (when someone completes chatbot)
window.trackLead = (value = 0) => {
    fbq('track', 'Lead', {
        value: value,
        currency: 'ILS'
    });
};

// ────────────────────────────────────────────────────────────
// 3. HOTJAR (Heat Maps & Session Recording)
// ────────────────────────────────────────────────────────────
// Replace 'HOTJAR_ID' with your Hotjar site ID
// Replace 'HOTJAR_VERSION' with your snippet version (usually 6)

(function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:HOTJAR_ID,hjsv:HOTJAR_VERSION};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');

// ────────────────────────────────────────────────────────────
// 4. GOOGLE TAG MANAGER (Optional - Advanced)
// ────────────────────────────────────────────────────────────
// Replace 'GTM-XXXXXXX' with your GTM container ID

(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');

// ────────────────────────────────────────────────────────────
// 5. MICROSOFT CLARITY (Alternative to Hotjar - Free!)
// ────────────────────────────────────────────────────────────
// Replace 'CLARITY_ID' with your Clarity project ID

(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "CLARITY_ID");

// ────────────────────────────────────────────────────────────
// 6. SCROLL DEPTH TRACKING
// ────────────────────────────────────────────────────────────

let scrollDepths = [25, 50, 75, 100];
let scrollTracked = [];

window.addEventListener('scroll', () => {
    const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    
    scrollDepths.forEach(depth => {
        if (scrollPercent >= depth && !scrollTracked.includes(depth)) {
            scrollTracked.push(depth);
            trackEvent('scroll_depth', {
                'event_category': 'engagement',
                'event_label': `${depth}%`,
                'value': depth
            });
        }
    });
});

// ────────────────────────────────────────────────────────────
// 7. TIME ON PAGE TRACKING
// ────────────────────────────────────────────────────────────

let timeOnPage = 0;
const timeIntervals = [10, 30, 60, 120, 300]; // seconds
let timeTracked = [];

setInterval(() => {
    timeOnPage += 10;
    
    timeIntervals.forEach(interval => {
        if (timeOnPage >= interval && !timeTracked.includes(interval)) {
            timeTracked.push(interval);
            trackEvent('time_on_page', {
                'event_category': 'engagement',
                'event_label': `${interval}_seconds`,
                'value': interval
            });
        }
    });
}, 10000);

// ────────────────────────────────────────────────────────────
// 8. OUTBOUND LINK TRACKING
// ────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.href.includes(window.location.hostname)) {
            link.addEventListener('click', function(e) {
                trackEvent('outbound_click', {
                    'event_category': 'outbound',
                    'event_label': this.href,
                    'transport_type': 'beacon'
                });
            });
        }
    });
});

// ────────────────────────────────────────────────────────────
// 9. FILE DOWNLOAD TRACKING
// ────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href$=".pdf"], a[href$=".doc"], a[href$=".docx"], a[download]').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('file_download', {
                'event_category': 'download',
                'event_label': this.href,
                'file_name': this.href.split('/').pop()
            });
        });
    });
});

// ────────────────────────────────────────────────────────────
// 10. ERROR TRACKING
// ────────────────────────────────────────────────────────────

window.addEventListener('error', (e) => {
    trackEvent('javascript_error', {
        'event_category': 'error',
        'event_label': e.message,
        'error_file': e.filename,
        'error_line': e.lineno
    });
});

// ────────────────────────────────────────────────────────────
// 11. PERFORMANCE TRACKING
// ────────────────────────────────────────────────────────────

window.addEventListener('load', () => {
    setTimeout(() => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        trackEvent('page_performance', {
            'event_category': 'performance',
            'event_label': 'page_load_time',
            'value': Math.round(pageLoadTime / 1000) // in seconds
        });
    }, 0);
});

// ═══════════════════════════════════════════════════════════
// CONSOLE REMINDER
// ═══════════════════════════════════════════════════════════

console.log('📊 Analytics Configuration Loaded');
console.log('⚠️  Remember to replace placeholder IDs with your actual tracking IDs!');
console.log('✅ Google Analytics: G-XXXXXXXXXX');
console.log('✅ Facebook Pixel: YOUR_PIXEL_ID');
console.log('✅ Hotjar: HOTJAR_ID');
console.log('✅ Clarity: CLARITY_ID');
console.log('✅ GTM: GTM-XXXXXXX');

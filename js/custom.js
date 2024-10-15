// Pega o ano atual para exibir no rodapé:
function getYear() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear().toString();

    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

// client section owl carousel
$(".client_owl-carousel").owlCarousel({
    loop: true,
    margin: 20,
    dots: false,
    nav: true,
    navText: [],
    autoplay: true,
    autoplayHoverPause: true,
    navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>',
    ],
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 2,
        },
        1000: {
            items: 2,
        },
    },
});

/** google_map js **/
// function myMap() {
//     var mapProp = {
//         center: new google.maps.LatLng(40.712775, -74.005973),
//         zoom: 18,
//     };
//     var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
// }

const form = document.getElementById("form-newsletter");

async function handleSubmit(event) {
    event.preventDefault();

    let status = document.getElementById("form-newsletter-status");
    let data = new FormData(event.target);

    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            Accept: "application/json",
        },
    })
        .then((response) => {
            if (response.ok) {
                status.innerHTML =
                    "Que bom que você se inscreveu, logo enviaremos novidades!";
                form.reset();
            } else {
                response.json().then((data) => {
                    if (Object.hasOwn(data, "errors")) {
                        status.innerHTML = data["errors"]
                            .map((error) => error["message"])
                            .join(", ");
                    } else {
                        status.innerHTML = "Oops! Houve um problema no cadastro.";
                    }
                });
            }
        })
        .catch((error) => {
            status.innerHTML = "Oops! Houve um problema no cadastro.";
        });

    $('#modal-newsletter').modal('show');
}

form.addEventListener("submit", handleSubmit);

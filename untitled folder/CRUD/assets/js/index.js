$("#add_user").submit(function (event) {
    alert("Data Inserted Successfully!");
})

$("#update_user").submit(function (event) {
    event.preventDefault();

    let unindexedArray = $(this).serializeArray();
    const data = {};

    $.map(unindexedArray, function (n, i) {
        data[n['name']] = n['value'];
    });


    const request = {
        "url": `http://localhost:8080/api/users/${data.id}`,
        "method": "PUT",
        "data": data
    };

    $.ajax(request).done(function (response) {
        alert("Data Updated Successfully!");
    });

});

if (window.location.pathname == "/") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function () {
        const id = $(this).attr("data-id");

        const request = {
            "url": `http://localhost:8080/api/users/${id}`,
            "method": "DELETE"
        };

        if (confirm("Do you really want to delete this record?")) {
            $.ajax(request).done((response) => {
                alert("Data Deleted Successfully!");
                location.reload();
            });
        }

    });
}
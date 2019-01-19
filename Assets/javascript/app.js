//function to connect the information to the button
$(document).ready(function(){
    function who(){
        $('button').on('click', function() { 
            var comic = $(this).data('name');
           //connects to API to collect information about GIFs
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + comic + "&api_key=dhT1RoafJFFb2tGG2ZPSeEuVUaere6C6";
            $.ajax({
                url: queryURL,
                method: 'GET'
            })
           // Pulls Animated Gifs and information
            .done(function(response) {
                console.log(response)
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    var comicDiv = $('<div/>');
                    var p =$('<p/>');
                    p.text(results[i].rating);
                    var comicImage = $('<img/>');
                    comicImage.addClass('anImg')
                    comicImage.attr('src', results[i].images.fixed_height.url);
                    comicImage.attr('data-still', results[i].images.fixed_height_still.url)
                    comicImage.attr('data-animate', results[i].images.fixed_height.url)
                    .attr('data-state', 'still');
                    comicDiv.append(p);
                    comicDiv.append(comicImage);
                    comicDiv.prependTo($('#gifs'));
                }
//Changes Gifs to stills and back to Animated Gifs
                $('.anImg').on('click', function() {
                    var state = $(this).attr('data-state'); 
                    console.log(this);
                    if (state == 'still') {
                        $(this).attr('src', $(this).data('animate'));
                        $(this).attr('data-state', 'animate');
                    } else {                            
                        $(this).attr('src', $(this).data('still'));                   
                        $(this).attr('data-state', 'still');
                    }      
                });
            });
        });
    }

    who();
    console.log("DOM Ready")

    comic = [''];
    // Adds Gifs to Add Comic Heroes and Comic Groups Search Button
    $('#aButton').on('click', function(){
        event.preventDefault();        
        console.log("adding a button")
        var comicButton = $("#gif-input").val();
        var newButton = $("<button/>").addClass( "comic").attr('data-name',comicButton).html(comicButton);
        $("#comicbuttons").append(newButton);
        who();
    
    });
});
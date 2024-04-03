$(document).ready(function(){   

    $('#currencyForm').submit(function(e){
        console.log("form submitted");
        e.preventDefault();
        var fromCurrency= $('#fromCurrency').val();
        var toCurrency= $('#toCurrency').val();
        var amount= $('#amount').val();

        if(amount == ""){   
            alert("Please enter the amount");
            return;
        }else if(fromCurrency == ""){   
            alert("Please select the from currency");
            return;     
        }else if(toCurrency == ""){ 
            alert("Please select the to currency");
            return;
        }

        if(fromCurrency == toCurrency){
            alert("Please select different currencies");
            return;
        }

        $.ajax({
            url: 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert',
            type: 'GET',

            data:{
                from: fromCurrency,
                to: toCurrency,
                amount: amount

            },
            headers: {
                'X-RapidAPI-Key': '5f92afdbcamsh21d4cbe42821bd6p13c05ejsnf6d63cc81347',
                'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
              }

        })
        .done(function(response){
            if(response.success)
            {
              $('#exchangeResponse').empty().append(`${response.query.amount} ${response.query.from} to ${response.query.to} is ${response.result} ${response.query.to} `);
            }else{
                $('#exchangeResponse').empty().append('Error in conversion. Please try again later.');
            }

        });
    });

});
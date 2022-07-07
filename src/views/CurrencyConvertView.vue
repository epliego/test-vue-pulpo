<template>
  <div class="currency-convert">
    <h1>Currency Convert</h1>
    <div class="row">
      <div class="col-4">
        <select id="from_currency">
          <option disabled value="">Convertir desde</option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
      </div>
      <div class="col-4">
        <select id="to_currency">
          <option disabled value="">Convertir a</option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
      </div>
      <div id="currency_conversion" class="col-4"></div>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script setup lang="ts">
import $ from 'jquery';

function currency_conversion(from_currency: string | number | string[] | undefined, to_currency: string | number | string[] | undefined) {
  $.ajax({
    url: 'http://localhost:3001/v1/currency/currency-conversion',
    dataType: "json",
    cache: false,
    //timeout: 5000,
    type: "POST",
    data: {
      from_currency: from_currency,
      to_currency: to_currency,
    },
    beforeSend: function(data: any) {
      console.log('Por favor, espere...');
    },
    success: function(data: any) {
      //console.log(data);
      if (data.statusCode === 200) {
        //console.log(data.data);
        let value = '';
        $.each(data.data, function(i, val){
          //console.log(val);
          value = val;
        });
        $("#currency_conversion").html('<p style="font-size: larger">' + value + '</p>');
      } else {
        alert('Hubo un error haciendo la conversión');
      }
    },
    error: function(jqXHR: any, textStatus: string, errorThrown: string) {
      alert(textStatus+' '+errorThrown);
    }
  });
}

function list_from_currencies() {
  $.ajax({
    url: 'http://localhost:3001/v1/currency/list-currencies',
    dataType: "json",
    cache: false,
    //timeout: 5000,
    type: "POST",
    data: {},
    beforeSend: function(data: any) {
      console.log('Por favor, espere...');
    },
    success: function(data: any) {
      //console.log(data);
      if (data.statusCode === 200) {
        let options = '';
        $.each(data.data, function(i, val){
          //console.log(val);
          //console.log(data);
          options = options + "<option value='"+val.id+"'>"+val.currencyName+"</option>";
        });
        $('#from_currency').empty();
        $('#from_currency').append('<option disabled value="">Convertir desde</option>');
        $('#from_currency').append(options);
      } else {
        alert('Hubo un error llenando el select Convertir desde');
      }
    },
    error: function(jqXHR: any, textStatus: string, errorThrown: string) {
      alert(textStatus+' '+errorThrown);
    }
  });
}

function list_to_currencies() {
  $.ajax({
    url: 'http://localhost:3001/v1/currency/list-currencies',
    dataType: "json",
    cache: false,
    //timeout: 5000,
    type: "POST",
    data: {},
    beforeSend: function(data: any) {
      console.log('Por favor, espere...');
    },
    success: function(data: any) {
      //console.log(data);
      if (data.statusCode === 200) {
        let options = '';
        $.each(data.data, function(i, val){
          //console.log(val);
          //console.log(data);
          options = options+"<option value='"+val.id+"'>"+val.currencyName+"</option>";
        });
        $('#to_currency').empty();
        $('#to_currency').append('<option disabled value="">Convertir a</option>');
        $('#to_currency').append(options);
      } else {
        alert('Hubo un error llenando el select Convertir desde');
      }
    },
    error: function(jqXHR: any, textStatus: string, errorThrown: string) {
      alert(textStatus+' '+errorThrown);
    }
  });
}

list_from_currencies();
list_to_currencies();

$("body").on("change", "#from_currency", function(event) {
  currency_conversion($(this).val(), $('#to_currency').val());
});

$("body").on("change", "#to_currency", function(event) {
  currency_conversion($('#from_currency').val(), $(this).val());
});
</script>

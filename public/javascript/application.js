$(document).ready(function() {

  var queryCount = 0;

  $('.modal-trigger').leanModal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200, // Transition out duration
      starting_top: '4%', // Starting top style attribute
      ending_top: '10%', // Ending top style attribute
    }
  );

  $('#info').openModal();

  $('.tooltipped').tooltip({delay: 50});

  $('#query').on('click',function(){
    $('#query-builder').openModal()
  });


  $('#ask_button').on('click', function() {
    var query = $('#function-call').val().concat($('#query').val());
    query = appendBrackets(query);
    $.post("http://localhost:3000/ask", { query: query })
      .done(function(response) {
        queryCount++;
        $('#output_box').append("you: " + query + "\n" + response + "\n");
      });
    $('#askee-value').text("<Clicking an alien assigns them a query>");
    $('#query').val("");
    $('#function-call').val("");
  });

  $('#zip').on('click', function() {
    var contents = $('#function-call').val();
    $('#function-call').val(contents + 'zip.ask(');

    var askeeLine = $('#askee-value').text();
    if (askeeLine == "<Clicking an alien assigns them a query>") {
      $('#askee-value').text("Ask Zip if ");
    } else {
      askeeLine = askeeLine.replace("if", "to ask Zip if")
      $('#askee-value').text(askeeLine)
    }
  });

  $('#zap').on('click', function() {
    var contents = $('#function-call').val();
    $('#function-call').val(contents + 'zap.ask(');

    var askeeLine = $('#askee-value').text();
    if (askeeLine == "<Clicking an alien assigns them a query>") {
      $('#askee-value').text("Ask Zap if ");
    } else {
      askeeLine = askeeLine.replace("if", "to ask Zap if")
      $('#askee-value').text(askeeLine)
    }
  });

  $('#red-pie').on('click', function() {
    $.post("http://localhost:3000/solve", { solution: "red_pie" })
      .done(function(response) {
        $('#output_box').val(response);
      });
  });

  $('#purple-pie').on('click', function() {
    $.post("http://localhost:3000/solve", { solution: "purple_pie" })
      .done(function(response) {
        $('#output_box').append("\n" + response);
      });
  });

  $('.bldr-obj').on('click', function() {
    var objId = $(this).attr('id');
    $('#query').val($('#query').val() + objId);
    $('#askee-value').text($('#askee-value').text() + ' ' + $(this).text())
  });

  $('#is').on('click', function() {
    var objId = $(this).attr('id');
    $('#query').val($('#query').val() + ' == ');
    $('#askee-value').text($('#askee-value').text() + ' ' + $(this).text())
  });

  $('#is-not').on('click', function() {
    var objId = $(this).attr('id');
    $('#query').val($('#query').val() + ' != ');
    $('#askee-value').text($('#askee-value').text() + ' ' + $(this).text())
  });

});

var appendBrackets = function(input) {
  var indexCap = input.length - 1;
  for (var i = 0; i <= indexCap; i++) {
    if (input.charAt(i) == '(') {
      input += ')';
    }
  }
  return input
}

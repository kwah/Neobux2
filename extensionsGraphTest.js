mk_ch( 'ch_recycle', '', ['Today','Tomorrow','2010/09/03','2010/09/04','2010/09/05','2010/09/06','2010/09/07','2010/09/08','2010/09/09','2010/09/10','2010/09/11','2010/09/12','2010/09/13','2010/09/14','2010/09/15','2010/09/16','2010/09/17','2010/09/18','2010/09/19','2010/09/20','2010/09/21','2010/09/22','2010/09/23','2010/09/24','2010/09/25','2010/09/26','2010/09/27','2010/09/28','2010/09/29','2010/09/30','2010/10/01','2010/10/02','2010/10/03','2010/10/04','2010/10/05','2010/10/06','2010/10/07','2010/10/08','2010/10/09','2010/10/10','2010/10/11','2010/10/12','2010/10/13','2010/10/14','2010/10/15','2010/10/16','2010/10/17','2010/10/18','2010/10/19','2010/10/20','2010/10/21','2010/10/22','2010/10/23','2010/10/24','2010/10/25','2010/10/26','2010/10/27','2010/10/28','2010/10/29','2010/10/30','2010/10/31','2010/11/01','2010/11/02','2010/11/03','2010/11/04','2010/11/05','2010/11/06','2010/11/07','2010/11/08','2010/11/09','2010/11/10','2010/11/11','2010/11/12','2010/11/13','2010/11/14','2010/11/15','2010/11/16','2010/11/17','2010/11/18','2010/11/19','2010/11/20','2010/11/21','2010/11/22','2010/11/23','2010/11/24','2010/11/25','2010/11/26','2010/11/27','2010/11/28','2010/11/29'], '<b>', '</b>', [ { name:'Total of referrals', data:[0,0,0,47,45,112,45,54,74,123,117,3,0,100,1,57,50,57,110,34,23,23,12,8,15,7,5,4,0,0,144,2,10,82,2,110,6,10,5,157,60,1,1,203,4,4,5,159,70,26,22,27,38,47,35,55,58,77,89,81,141,67,43,87,23,76,17,10,170,12,51,85,99,154,84,32,26,56,103,22,22,43,35,49,58,67,71,81,0,0] } ], 0, 0, -20.3, [9.5,29.5,59.5,89.5] );



/* CONSTANTS */

var MSPD = 86400000; // MilliSeconds Per Day
var Today = new Date();
var Yesterday = new Date();
Yesterday.setDate(Today.getDate() - 1);
var Recent = new Date();
Recent.setDate(Today.getDate() - 7);

var TODAY_STRING = Today.getFullYear()+'/'+(((Today.getMonth()+1)<10)?'0':'')+(Today.getMonth()+1)+'/'+((Today.getDate()<10)?'0':'')+Today.getDate();
var YESTERDAY_STRING = Yesterday.getFullYear()+'/'+(((Yesterday.getMonth()+1)<10)?'0':'')+(Yesterday.getMonth()+1)+'/'+((Yesterday.getDate()<10)?'0':'')+Yesterday.getDate();
var RECENT_STRING = Yesterday.getFullYear()+'/'+(((Yesterday.getMonth()+1)<10)?'0':'')+(Yesterday.getMonth()+1)+'/'+((Yesterday.getDate()<10)?'0':'')+Yesterday.getDate();

var dates_array = [];
var i=0;
do
{
  var blah = new Date();
  blah.setDate(new Date().getDate() - i);

  var tmp_DateString = blah.getFullYear() + '/' + (((blah.getMonth()+1) < 10) ? '0' + (blah.getMonth()+1) : (blah.getMonth()+1)) + '/' + (((blah.getDate()) < 10) ? '0' + (blah.getDate()) : (blah.getDate()));
  dates_array[9-i] = tmp_DateString;
  i++;

}while(i<90);




function sanitiseDate(_dateString){
  _dateString = _dateString.replace(/Today/,TODAY_STRING);
  _dateString = _dateString.replace(/Yesterday/,YESTERDAY_STRING);

  return _dateString;
}


function extractGraphData()
{
  var graphData = new Array();
  graphData[0] = [ 'ch_recycle', '', ['Today','Tomorrow','2010/09/03','2010/09/04','2010/09/05','2010/09/06','2010/09/07','2010/09/08','2010/09/09','2010/09/10','2010/09/11','2010/09/12','2010/09/13','2010/09/14','2010/09/15','2010/09/16','2010/09/17','2010/09/18','2010/09/19','2010/09/20','2010/09/21','2010/09/22','2010/09/23','2010/09/24','2010/09/25','2010/09/26','2010/09/27','2010/09/28','2010/09/29','2010/09/30','2010/10/01','2010/10/02','2010/10/03','2010/10/04','2010/10/05','2010/10/06','2010/10/07','2010/10/08','2010/10/09','2010/10/10','2010/10/11','2010/10/12','2010/10/13','2010/10/14','2010/10/15','2010/10/16','2010/10/17','2010/10/18','2010/10/19','2010/10/20','2010/10/21','2010/10/22','2010/10/23','2010/10/24','2010/10/25','2010/10/26','2010/10/27','2010/10/28','2010/10/29','2010/10/30','2010/10/31','2010/11/01','2010/11/02','2010/11/03','2010/11/04','2010/11/05','2010/11/06','2010/11/07','2010/11/08','2010/11/09','2010/11/10','2010/11/11','2010/11/12','2010/11/13','2010/11/14','2010/11/15','2010/11/16','2010/11/17','2010/11/18','2010/11/19','2010/11/20','2010/11/21','2010/11/22','2010/11/23','2010/11/24','2010/11/25','2010/11/26','2010/11/27','2010/11/28','2010/11/29'], '<b>', '</b>', [ { name:'Total of referrals', data:[0,0,0,47,45,112,45,54,74,123,117,3,0,100,1,57,50,57,110,34,23,23,12,8,15,7,5,4,0,0,144,2,10,82,2,110,6,10,5,157,60,1,1,203,4,4,5,159,70,26,22,27,38,47,35,55,58,77,89,81,141,67,43,87,23,76,17,10,170,12,51,85,99,154,84,32,26,56,103,22,22,43,35,49,58,67,71,81,0,0] } ], 0, 0, -20.3, [9.5,29.5,59.5,89.5] ];

  for(_i in graphData) {
    GRAPHS_onCurrentPage['extensions'] = graphData[_i];
  }

  console.info('GRAPHS_onCurrentPage');
  console.info(GRAPHS_onCurrentPage);

  function updateGraphData()
  {
    // Grab the data from storage
    _graphs = {} ;

    // Update the stored data with the new data obtained from the current page
    for(var _i in GRAPHS_onCurrentPage)
    {
      var _currentGraph = GRAPHS_onCurrentPage[_i];

      var tmp_currentGraph = {};
      tmp_currentGraph.containerID = _currentGraph[0];
      tmp_currentGraph.name = _currentGraph[5][0]['name'];

      tmp_currentGraph.rawData = (tmp_currentGraph.containerID !== 'ch_ext_schedule') ? _currentGraph[5][0]['data'].reverse() : _currentGraph[5][0]['data'];

      tmp_currentGraph.data = {};
      for(var i = 0, length = _currentGraph[2].length; i < length; i++) {
        tmp_currentGraph.data[sanitiseDate(_currentGraph[2][i])] = _currentGraph[5][0]['data'][length - i - 1];
      }


      var sqsum = 0;
      tmp_currentGraph.mean = new Array();
      tmp_currentGraph.sum = new Array();
      tmp_currentGraph.variance = new Array();
      tmp_currentGraph.sdev = new Array();

      tmp_currentGraph.mean[0] = tmp_currentGraph.rawData[0];
      tmp_currentGraph.sum[0] = tmp_currentGraph.rawData[0];
      tmp_currentGraph.variance[0] = tmp_currentGraph.rawData[0];
      tmp_currentGraph.sdev[0] = tmp_currentGraph.rawData[0];


      for (var i = 1; i < tmp_currentGraph.rawData.length; ++i)
      {
        var x = tmp_currentGraph.rawData[i];
        var delta = x - tmp_currentGraph.mean[i-1];
        var sweep = i + 1.0;
        tmp_currentGraph.mean[i] = tmp_currentGraph.mean[i-1] + (delta / sweep);
        sqsum += delta * delta * (i / sweep);

        tmp_currentGraph.sum[i] = tmp_currentGraph.sum[i-1] + x;
        tmp_currentGraph.variance[i] = sqsum / (i + 1);
        tmp_currentGraph.sdev[i] = Math.sqrt(tmp_currentGraph.variance[i]);
      }

      tmp_currentGraph.mean.splice(0,0,undefined);
      tmp_currentGraph.sum.splice(0,0,undefined);
      tmp_currentGraph.variance.splice(0,0,undefined);
      tmp_currentGraph.sdev.splice(0,0,undefined);

      // Generate equivalents of the data in various 'exported' formats
      var text = new Array();
      var CSV = new Array();
      var TSV = new Array();

      for (var i = 0; i < _currentGraph[5][0]['data'].length; i++)
      {
        var date = new Date();
        date.setDate(Today.getDate() - i);

        var currentDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();

        text[i] = _currentGraph[5][0]['data'][i];
        CSV[i] = currentDate + ',' + _currentGraph[5][0]['data'][i];
        TSV[i] = currentDate + '\t' + _currentGraph[5][0]['data'][i];
      }


      tmp_currentGraph.export = {
        'text': text.join('\n'),
        'CSV': CSV.join(',\n'),
        'TSV': TSV.join('\t\n'),
        'reverse': {
          'text': text.reverse().join('\n'),
          'CSV': CSV.reverse().join(',\n'),
          'TSV': TSV.reverse().join('\t\n')
        }
      };



      tmp_currentGraph.today = tmp_currentGraph.data[TODAY_STRING];
      tmp_currentGraph.yesterday = tmp_currentGraph.data[YESTERDAY_STRING];
      tmp_currentGraph.recent = tmp_currentGraph.sum[7];
      tmp_currentGraph.sum = tmp_currentGraph.sum;

      tmp_currentGraph.rawData = new Array();

      var k = tmp_currentGraph.data.__count__;
      for(var j in tmp_currentGraph.data)
      {
       k--;
       tmp_currentGraph.rawData[k] = tmp_currentGraph.data[j];
      }


       var xpathResults_averages = document.evaluate(
         "//td[@class='f_r']/span[@class='f_b']",
         document,
         null,
         XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
         null);

      if ('directClicks' == _i)
      {
        tmp_currentGraph.currentAverage = parseFloat(xpathResults_averages.snapshotItem(1).textContent);
        tmp_currentGraph.projectedAverage = parseFloat(xpathResults_averages.snapshotItem(2).textContent);
        tmp_currentGraph.today_projected = tmp_currentGraph.projectedAverage * myAccountDetails.numberOfRefs.Direct;
      }
      else if ('rentedClicks' == _i)
      {
        tmp_currentGraph.currentAverage = parseFloat(xpathResults_averages.snapshotItem(3).textContent);
        tmp_currentGraph.projectedAverage = parseFloat(xpathResults_averages.snapshotItem(4).textContent);
        tmp_currentGraph.today_projected = tmp_currentGraph.projectedAverage * myAccountDetails.numberOfRefs.Rented;
      }


      _graphs['extensions'] = tmp_currentGraph;
    }

  }


  updateGraphData();

  // Save the updated data
 //manipulatePrefs.setPref('_graphs',JSON.stringify(_graphs));

  console.info('_graphs');
  console.info(_graphs);

  console.info('GRAPHS_onCurrentPage');
  console.info(GRAPHS_onCurrentPage);

}


  var _graphs = {};
  var GRAPHS_onCurrentPage = new Array();

  extractGraphData();


var _currentGraph = _graphs.extensions;

    var sum_Array = new Array();
    var avg_Array = new Array();

var graph_timePeriod = [7,15,30,60,90];

    for(var j=0; j < graph_timePeriod.length; j++)
    {
      sum_Array.push([graph_timePeriod[j], _currentGraph.sum[graph_timePeriod[j]].toFixed(3)]);
      avg_Array.push([graph_timePeriod[j], _currentGraph.mean[graph_timePeriod[j]].toFixed(3)]);
    }

    document.getElementById(_currentGraph.containerID).parentNode.style.height = '150px';



  function addDataBarUnderGraph(_title, _containerID, _prefix, _data, _suffix, _CSSstyle)
  {
    //var graphBarCSS = ".graphBar { border:1px solid #AAAAAA; color:#444444; float:left; font-family:verdana; font-size:9px; font-weight:bold; height:14px; margin-bottom:10px; margin-left:7%; margin-top:-11px; padding:1px 2%; text-align:left; vertical-align:middle; white-space:nowrap; width:80%; }";
    //GM_addStyle(graphBarCSS);

    var bar = document.createElement("DIV");
    bar.setAttribute("class", "graphBar");
    bar.setAttribute("style", _CSSstyle);

    bar.innerHTML = _title;

    for (var dataItem in _data) {
      bar.innerHTML += _prefix + _data[dataItem][0] + _suffix + _data[dataItem][1];
    }

    document.getElementById(_containerID).appendChild(bar);
    document.getElementById(_containerID).parentNode.style.height = parseInt(document.getElementById(_containerID).parentNode.style.height) + 15 + "px";

  }


    // Averages bar goes under all graphs
    addDataBarUnderGraph('Averages :', _currentGraph.containerID, ' (', avg_Array, ') ', 'margin-top:0px;');

    // Sums bar goes under all graphs
    addDataBarUnderGraph('Sums :', _currentGraph.containerID, ' (', sum_Array, ') ');
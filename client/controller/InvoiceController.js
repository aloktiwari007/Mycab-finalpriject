angular.module('Cabbooking').controller('InvoiceController',function($scope,$http,$location,AuthenticationService,$rootScope){

var getpdf=function()
{



  var pdf = new jsPDF('p', 'pt', 'letter');
          // source can be HTML-formatted string, or a reference
          // to an actual DOM element from which the text will be scraped.
         source = $('#content')[0];
          //source=$('div:hidden #content')[0];

          // we support special element handlers. Register them with jQuery-style
          // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
          // There is no support for any other type of selectors
          // (class, of compound) at this time.
          specialElementHandlers = {
              // element with id of "bypass" - jQuery style selector
              '#bypassme': function (element, renderer) {
                  // true = "handled elsewhere, bypass text extraction"
                  return true
              }
          };
          margins = {
              top: 80,
              bottom: 60,
              left: 60,
              width: 622,
              align:"center"

          };
          // all coords and widths are in jsPDF instance's declared units
          // 'inches' in this case
          pdf.fromHTML(
              source, // HTML string or DOM elem ref.
              margins.left, // x coord
              margins.top, { // y coord
                  'width': margins.width, // max width of content on PDF
                  'align':margins.align,
                  'elementHandlers': specialElementHandlers
              },

              function (dispose) {
                  // dispose: object with X, Y of the last line add to the PDF
                  //          this allow the insertion of new lines after html
                  pdf.save('mycab.pdf');
              }, margins

);
}


var getdata=function()
{
  $scope.cemail=sessionStorage.getItem('cust_id');
  console.log($scope.cemail);
$scope.driverbookingstatus="unbooked";
console.log($scope.driverbookingstatus);
  $http.get('/api/booking2/'+$scope.cemail+'/'+$scope.driverbookingstatus).then(function(response)

{
  $scope.data=response.data;
  console.log(response);
})

}
getdata();

$scope.printbill=function(s1)
{
  console.log(s1);
  $scope.print=s1;
  var date=$scope.print.PickupDate;
  var location=$scope.print.Pickuplocation
  var Deastinationlocation=$scope.print.Deastinationlocation;
  var Distance=$scope.print.Distance +"km";
  var Fare=$scope.print.Fare;
  var space="              ";
  var custname1=$scope.print.Custname;
  var recit="Booking No. :-  " +$scope.print._id;
  var invoice=space+"          "+space+"INVOICE";
  var amount="Total Amount paid:-  "  + " Rs. "+Fare
  var break1="</br></br></br></br></br></br></br></br></br></br></br></br>";
var custname=break1+" Thanks for travelling with us,  "+custname1.toUpperCase();
   $('#date').html(date);
   $('#loct').html(location);
   $('#dest').html(Deastinationlocation);
   $('#distance').html(Distance);
   $('#fare').html(Fare);
   $('#name').html(custname);
   $('#invoice').html(invoice);
   $('#amount').html(amount);
   $('#recit').html(recit);




getpdf();
}
//getpdf();

})

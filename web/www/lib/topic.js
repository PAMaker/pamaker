var db2 = require('./db2')
var template2 = require('./template2.js')

exports.home = function (request, response) {
  db2.query(`SELECT * FROM topic`, function (error, topics) {
    var title = ''
    var description =
      '후기 작성시 텍스트리뷰 1000포인트, 포토리뷰 2000포인트를 드립니다. (20자 이상 작성해 주세요) '
    function myFunction() {
      // Declare variables
      var input, filter, table, tr, td, i, txtValue
      input = document.getElementById('myInput')
      filter = input.value.toUpperCase()
      table = document.getElementById('myTable')
      tr = table.getElementsByTagName('tr')

      // Loop through all table rows, and hide those who don't match the search query
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName('td')[0]
        if (td) {
          txtValue = td.textContent || td.innerText
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = ''
          } else {
            tr[i].style.display = 'none'
          }
        }
      }
    }
    var list = template2.list(topics) //회원정보 리스트로 나열
    var html = template2.HTML(
      title,
      list,
      `<hr><p>${description}</p><br>`,
      `<a class="waves-effect waves-light btn main_btn" href="/fav/create" style="margin-bottom:80px ;">후기 작성하기</a>`
    )

    //response.writeHead(200);
    response.send(html)
  })
}

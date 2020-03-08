$(document)
.ready(function() {
  $('.ui.form')
    .form({
      fields: {
        username: {
            identifier: 'username',
            rules: [
              {
                type   : 'empty',
                prompt : 'Please enter a username'
              }
            ]
          },
        password: {
          identifier  : 'password',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your password'
            },
            {
              type   : 'length[6]',
              prompt : 'Your password must be at least 6 characters'
            }
          ]
        }
      }
    })
  ;
})
;
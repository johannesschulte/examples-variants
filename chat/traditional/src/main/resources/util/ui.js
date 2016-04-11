$(function() {
  window.UI = function(
      nameChanged, chatRequested, chatSelected, chatClosed, messageSent) {
    var self = this
    self.name = "Anonymous"

    function updateUsers(users) {
      ui.users.find("> li:not(:last)").remove()

      if (users.length != 0) {
        ui.nousers.hide()
        ui.users.prepend(users.map(function(user) {
          return $("<li/>").append(
            $("<a href=\"#\"/>").click(function(event) {
              event.preventDefault()
              chatRequested(user)
            })
            .text(user.name))
        }))
      }
      else
        ui.nousers.show()
    }

    function updateChats(chats) {
      ui.chats.find("> li:not(:last)").remove()

      ui.chats.prepend(chats.map(function(chat) {
        var button = $("<button type=\"button\" class=\"close\">×</button>")
        var badge = $("<span class=\"badge\"/>")
        if (chat.unread > 0)
          badge.text(chat.unread)
        var item = $("<li/>")
        if (chat.active)
          item.addClass("active")
        return item.append(
          $("<a href=\"#\"/>").click(function(event) {
            event.preventDefault()
            chatSelected(chat)
          })
          .text(chat.name).append(" ", badge, " ", button.click(function(event) {
            event.preventDefault()
            chatClosed(chat)
          })))
      }))
    }

    function updateMessages(messages) {
      ui.chatlog.empty()

      ui.chatlog.append(messages.map(function(message) {
        return $("<li/>").addClass(message.own ? "own" : "foreign").text(message.content)
      }))
    }

    var ui = {
      username: $("#username"),
      chats: $("#chats"),
      users: $("#users"),
      nousers: $("#nousers"),
      chatlog: $("#chatlog"),
      message: $("#message"),
      send: $("#send")
    }

    var placeholder = self.name

    ui.username.attr("placeholder", placeholder)

    ui.username.on("input", function() {
      var username = ui.username.val()
      var newusername = username.trim() == "" ? placeholder : username

      if (self.name != newusername) {
        self.name = newusername
        nameChanged(self.name)
      }
    })

    ui.username.trigger("input")

    ui.nousers.on("click", function(event) { event.preventDefault() })

    ui.send.on("click", function() { messageSent(ui.message.val()) })

    ui.message.on("keyup", function(event) {
      if (event.keyCode == 13) {
        event.preventDefault()
        ui.send.trigger("click")
      }
    })

    self.setUsers = function(users) {
      updateUsers(users)
    }
 
    self.setChats = function(chats) {
      updateChats(chats)
    }

    self.setMessages = function(messages) {
      updateMessages(messages)
    }

    self.clearMessage = function() {
      ui.message.val("")
    }
  }
})
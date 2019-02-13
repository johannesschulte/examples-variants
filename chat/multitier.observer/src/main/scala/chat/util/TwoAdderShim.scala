package chat.util


import scala.scalajs.js
import scala.scalajs.js.Dynamic.global

object TwoAdderShim {
  def callAdd(in : Int) : Int = {
    js.Dynamic.global.applyDynamic("addTwoJS")(in).asInstanceOf[Int]
  }
}

import React from 'react'

const Mainbutton = () => {
  return (
    <>
        
<div class="container absolute bottom-2 left-1/2">
  <div class="radio-wrapper">
    <input type="radio" id="value-1" name="btn" class="input" />
    <div class="btn">
      <span aria-hidden="">_</span>Cyber
      <span aria-hidden="" class="btn__glitch">_Cyber🦾</span>
      <label class="number">r1</label>
    </div>
  </div>
  <div class="radio-wrapper">
    <input type="radio" checked="true" id="value-2" name="btn" class="input" />
    <div class="btn">
      _Radio<span aria-hidden="">_</span>
      <span aria-hidden="" class="btn__glitch">_R_a_d_i_o_</span>
      <label class="number">r2</label>
    </div>
  </div>
  <div class="radio-wrapper">
    <input type="radio" id="value-3" name="btn" class="input" />
    <div class="btn">
      Buttons<span aria-hidden=""></span>
      <span aria-hidden="" class="btn__glitch">Buttons_</span>
      <label class="number">r3</label>
    </div>
  </div>
</div>

    
    </>
  )
}

export default Mainbutton
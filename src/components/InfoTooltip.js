import iconDone from '../images/icon-done.svg';
import iconError from '../images/icon-error.svg';

function InfoTooltip() {

  return (
    <section className="info-tooltip">
      <div className="info-tooltip__container">
        <button type="button" className="info-tooltip__close" />
        <img src={iconDone} className="info-tooltip__img" alt=""></img>
        <p className="info-tooltip__text">Test</p>
      </div>
    </section>
  )
}

export default InfoTooltip

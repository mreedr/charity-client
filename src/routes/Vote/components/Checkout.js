// / CheckoutForm.js
import React from 'react';
import { withRouter } from 'react-router';
import { injectStripe, CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement } from 'react-stripe-elements';
import TextInput from '../../../components/shared/TextInput';
import classnames from 'classnames';

// import AddressSection from './AddressSection';
// import CardSection from './CardSection';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)

    // inital error state
    this.state = {
      error: {
        name: false,
        email: false
      }
    }
    this.calculateTotal = this.calculateTotal.bind(this);
  }

  calculateTotal() {
    let { songCount } = this.props;
    if (songCount === 0) return 0;
    if (songCount === 1) return 3;
    if (songCount === 2) return 5;
    return songCount * 2;

  }

  handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault()

    this.setState({ error: {}, isLoading: true })

    const name = this.name.value
    const email = this.email.value
    if (!name) {
      this.setState({ error: { name: true } })
      return alert('Missing name')
    }
    if (!email) {
      this.setState({ error: { email: true } })
      return alert('Missing email')
    }

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({ name })
      .then((res) => {
        if (res.error) return alert(res.error.message)
        return this.props.vote(res.token, this.name.value, this.email.value)
          .then(() => {
            this.setState({isLoading: false});
            this.props.router.push('/results');
          });
      })
      .catch((err) => {
        alert(JSON.parse(err.request.responseText).message)
      });

    // However, this line of code will do the same thing:
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
  }

  render() {
    const { songCount } = this.props;

    return (
      <form onSubmit={this.handleSubmit} className="index-container">
        <div className="checkout-input"><TextInput
          type="text"
          name="name"
          className="text-input"
          placeholder="name"
          cref={(ref) => this.name = ref}
          error={this.state.error.name}
        /></div>
        <div className="checkout-input"><TextInput
          type="email"
          name="email"
          className="text-input"
          placeholder="email"
          cref={(ref) => this.email = ref}
          error={this.state.error.email}
        /></div>

        <div className="checkout-input"><CardNumberElement style={{base: {lineHeight: '50px'}}}/></div>
        <div className="checkout-input"><CardExpiryElement style={{base: {lineHeight: '50px'}}}/></div>
        <div className="checkout-input"><CardCVCElement style={{base: {lineHeight: '50px'}}}/></div>
        <div className="checkout-input"><PostalCodeElement style={{base: {lineHeight: '50px'}}}/></div>

        <div className="checkout-total">You selected {songCount} songs. <br /> We will charge your credit card ${this.calculateTotal(songCount)}.00</div>

        <button className={classnames({isLoading: this.state.isLoading, notLoading: !this.state.isLoading })} onClick={() => this.handleSubmit}>{(this.state.isLoading) ? <img src={require('../../../layouts/assets/spinner.svg')} /> : 'Confirm Payment'}</button>
      </form>
    );
  }
}

export default withRouter(injectStripe(CheckoutForm));

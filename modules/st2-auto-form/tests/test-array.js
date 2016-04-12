import React from 'react';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

import { TestComponent } from './utils';
import ArrayField from '../fields/array';

describe('AutoForm ArrayField', () => {
  it('produces an element with textarea as a child', () => {
    const props = {
      name: 'test',
      spec: {}
    };

    const c = new TestComponent(<ArrayField {...props} />);

    expect(c.fieldType()).to.be.equal('input');
  });

  it('changes the value and calls the callback if value is valid', () => {
    const onChange = sinon.spy();
    const props = {
      name: 'test',
      spec: {},
      onChange
    };

    const c = new TestComponent(<ArrayField {...props} />);

    c.makeChange('t,e,s,t');

    expect(onChange.withArgs(['t','e','s','t'])).to.be.calledOnce;

    expect(c.fieldValue()).to.be.equal('t,e,s,t');
    expect(c.value()).to.be.deep.equal(['t','e','s','t']);
  });

  it('does not change the value or calls the callback if value is invalid', () => {
    const onChange = sinon.spy();
    const props = {
      name: 'test',
      spec: {
        items: {
          type: 'number'
        }
      },
      onChange
    };

    const c = new TestComponent(<ArrayField {...props} />);

    c.makeChange('invalid');

    expect(onChange.withArgs('invalid')).to.not.be.called;

    expect(c.fieldValue()).to.be.equal('invalid');
    expect(() => c.value()).to.throw(SyntaxError);

    expect(c.fieldClass()).to.have.string('st2-auto-form__field--invalid');
  });

});

/**
 * @jest-environment jsdom
 */
import FormError from './FormError';

describe('FormError', () => {
  it('should render properly', () => {
    const renderedNode = FormError.render('test', 'testText');

    expect(renderedNode.innerText).toEqual('testText');
    expect(renderedNode.getAttribute('for')).toEqual('test');
    expect(renderedNode.getAttribute('generated')).toEqual('true');
    expect(renderedNode.tagName).toEqual('LABEL');
  });
});

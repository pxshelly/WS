import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../client/components/App.jsx';
import ProductImages from '../client/components/ProductImages.jsx';
import ProductDetails from '../client/components/ProductDetails.jsx';
import ImageCarousel from '../client/components/ImageCarousel.jsx';
import RecentlyViewed from '../client/components/RecentlyViewed.jsx';

Enzyme.configure({ adapter: new Adapter() });

const state = {
  name: 'Tahoe Buffet',
  priceRange: {
    "selling": {
    "high": 1899,
    "low": 1699
    }
  },
  thumbnail: {},
  hero: "https://www.westelm.com/weimgs/rk/images/wcm/products/201941/0006/tahoe-solid-wood-dining-table-natural-oak-m.jpg",
  images: [
    {
    "size": "m",
    "meta": "",
    "alt": "",
    "rel": "althero",
    "width": 363,
    "href": "https://www.westelm.com/weimgs/rk/images/wcm/products/201941/0006/tahoe-solid-wood-dining-table-natural-oak-m.jpg",
    "height": 363
    },
    {
    "size": "m",
    "meta": "",
    "alt": "",
    "rel": "althero",
    "width": 363,
    "href": "https://www.westelm.com/weimgs/rk/images/wcm/products/201941/0025/tahoe-solid-wood-dining-table-natural-oak-m.jpg",
    "height": 363
    },],
  focusIndex: 0,
  focusImage: "https://www.westelm.com/weimgs/rk/images/wcm/products/201941/0006/tahoe-solid-wood-dining-table-natural-oak-m.jpg"
}

describe('<App />', () => {
  it('Renders one ProductImages component', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(ProductImages)).toExist();
  });

  it('Renders one ProductDetails component', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(ProductDetails)).toExist();
  });

  it('Renders one ImageCarousel component', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(ImageCarousel)).toExist();
  });

  it('Renders one RecentlyViewed component', () => {
    const wrapper = mount(<App />);
    expect(wrapper.contains(<RecentlyViewed />)).toBe(true);
  });

  it('Carousel should open when hero image is clicked', () => {
    const wrapper = mount(<App />);
    wrapper.find('.hero-container').simulate('click');
    expect(wrapper.find(ProductImages)).toHaveState({isCarouselOpen: true});
    expect(wrapper.find('.carousel-modal')).toExist();
  });

  it('Image indicator should change as hero image changes in carousel', () => {
    const wrapper = mount(<App />);
    wrapper.setState(state);
    wrapper.find('.hero-container').simulate('click');
    const imageCarouselWrapper = wrapper.find(App);
    expect(imageCarouselWrapper.find('.dot').at(0).render().hasClass('filled-dot')).toBe(true);
    wrapper.find('.scroll-button-right').simulate('click');
    expect(imageCarouselWrapper.find('.dot').at(1).render().hasClass('filled-dot')).toBe(true);
  });

  it('Carousel should loop through images at the end', () => {
    const wrapper = mount(<App />);
    wrapper.setState(state);
    wrapper.find('.hero-container').simulate('click');
    const imageCarouselWrapper = wrapper.find(App);
    wrapper.find('.scroll-button-right').simulate('click');
    expect(imageCarouselWrapper.find('.dot').at(1).render().hasClass('filled-dot')).toBe(true);
    wrapper.find('.scroll-button-right').simulate('click');
    expect(imageCarouselWrapper.find('.dot').at(0).render().hasClass('filled-dot')).toBe(true);
  });

  it('Carousel should loop through images at the start', () => {
    const wrapper = mount(<App />);
    wrapper.setState(state);
    wrapper.find('.hero-container').simulate('click');
    const imageCarouselWrapper = wrapper.find(App);
    wrapper.find('.scroll-button-left').simulate('click');
    expect(imageCarouselWrapper.find('.dot').at(1).render().hasClass('filled-dot')).toBe(true);
    wrapper.find('.scroll-button-left').simulate('click');
    expect(imageCarouselWrapper.find('.dot').at(0).render().hasClass('filled-dot')).toBe(true);
  });

  it('Carousel should close when exit button is clicked', () => {
    const wrapper = mount(<App />);
    wrapper.setState(state);
    wrapper.find('.hero-container').simulate('click');
    expect(wrapper.find(ProductImages)).toHaveState({isCarouselOpen: true});
    expect(wrapper.find('.carousel-modal')).toExist();
    wrapper.find('.exit-icon').simulate('click');
    expect(wrapper.find(ProductImages)).toHaveState({isCarouselOpen: false});
    expect(wrapper.exists('.carousel-modal')).toBe(false);
  });

  it('Carousel should close when clicking outside of modal', () => {
    const wrapper = mount(<App />);
    wrapper.setState(state);
    wrapper.find('.hero-container').simulate('click');
    expect(wrapper.find(ProductImages)).toHaveState({isCarouselOpen: true});
    expect(wrapper.find('.carousel-modal')).toExist();
    wrapper.find('.carousel-modal').simulate('click');
    expect(wrapper.find(ProductImages)).toHaveState({isCarouselOpen: false});
    expect(wrapper.exists('.carousel-modal')).toBe(false);
  });

  it('Renders product details', () => {
    const wrapper = mount(<App />);
    wrapper.setState(state);
    expect(wrapper.find('.details')).toExist();
  });

  it('Hero image changes when a gallery image is clicked on', () => {
    const wrapper = mount(<App />);
    wrapper.setState(state);
    const targetImage = wrapper.find('.gallery-img').at(1);
    targetImage.simulate('click');
    const heroImage = wrapper.find('.hero-container').childAt(0).html();
    expect(wrapper.state('focusIndex')).toBe(1);
    expect(targetImage.render().hasClass('gallery-active-img')).toBe(true);
    expect(heroImage).toBe(targetImage.childAt(0).html());
  });
});
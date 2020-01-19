import React from 'react';
import { ErrorImageOverlay, ErrorImageContainer, ErrorImageText } from './error-boundary.styles';

class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = {
      hasErrored: false,
    }
  }

  static getDerivedStateFromError() {
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {
    //отсюда можно сообщить об ошибки на сервер
    console.log(error, info);
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl="https://i.imgur.com/O0DCcQy.png" />
          <ErrorImageText>Sorry, this page is broken</ErrorImageText>
        </ErrorImageOverlay>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

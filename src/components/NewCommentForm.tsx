/* eslint-disable @typescript-eslint/indent */
import classNames from 'classnames';
import { useState } from 'react';

type NewCommentFormProps = {
  onNewComment: (name: string, email: string, text: string) => void;
  loadingFormSubmit: boolean;
};

export const NewCommentForm = ({
  onNewComment,
  loadingFormSubmit,
}: NewCommentFormProps) => {
  const [authorName, setAuthorName] = useState<string>('');
  const [authorEmail, setAuthorEmail] = useState<string>('');
  const [authorText, setAuthorText] = useState<string>('');
  const [formSubmited, setFormSubmited] = useState<boolean>(false);

  const handleFormSubmit = (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setFormSubmited(true);

    if (authorName && authorEmail && authorText) {
      onNewComment(authorName, authorEmail, authorText);
      setFormSubmited(false);
      setAuthorText('');
    }
  };

  const handleClearForm = () => {
    setAuthorName('');
    setAuthorEmail('');
    setAuthorText('');
    setFormSubmited(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={event => handleFormSubmit(event)}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': !authorName && formSubmited,
            })}
            value={authorName}
            onChange={event => setAuthorName(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!authorName && formSubmited && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!authorName && formSubmited && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': !authorEmail && formSubmited,
            })}
            value={authorEmail}
            onChange={event => setAuthorEmail(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!authorEmail && formSubmited && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!authorEmail && formSubmited && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': !authorText && formSubmited,
            })}
            value={authorText}
            onChange={event => setAuthorText(event.target.value)}
          />
        </div>

        {!authorText && formSubmited && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': loadingFormSubmit,
            })}
            onClick={event => handleFormSubmit(event)}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};

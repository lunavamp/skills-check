export default function FAQ() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp"
          className="max-w-xl rounded-lg shadow-2xl"
        />
        <div>
          <h2 className="text-5xl font-bold">Box Office News!</h2>
          <div className="collapse bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-1" defaultChecked />
            <div className="collapse-title font-semibold">
              Can I retake a test?
            </div>
            <div className="collapse-content text-sm">
              Absolutely—unlimited retries to keep improving!
            </div>
          </div>
          <div className="collapse bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-1" />
            <div className="collapse-title font-semibold">
              Do I need an account?
            </div>
            <div className="collapse-content text-sm">
              No registration required, but signing up saves your history.
            </div>
          </div>
          <div className="collapse bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-1" />
            <div className="collapse-title font-semibold">
              Where do the questions come from?
            </div>
            <div className="collapse-content text-sm">
              They’re vetted and refreshed by our admin team—no repeat questions
              more than once a month.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

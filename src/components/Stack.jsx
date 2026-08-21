export default function Stack({ config }) {
  const skills = config.skills || {};
  const entries = Object.entries(skills);

  return (
    <section className="section stack" id="stack">
      <div className="section-head">
        <span className="tag mono">/ stack</span>
        <h2>package.json</h2>
      </div>
      <div className="stack-panel mono">
        <div className="stack-panel-bar">
          <span></span><span></span><span></span>
          <p>dependencies.json</p>
        </div>
        <pre>
          {'{\n'}
          {entries.map(([key, arr], i) => (
            <span key={key}>
              {'  '}
              <span className="key">"{key}"</span>{': ['}
              {arr.map((a, j) => (
                <span key={j}>
                  <span className="str">"{a}"</span>
                  {j < arr.length - 1 ? ', ' : ''}
                </span>
              ))}
              {']'}
              {i < entries.length - 1 ? ',' : ''}
              {'\n'}
            </span>
          ))}
          {'}'}
        </pre>
      </div>
    </section>
  );
}

import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    prism.highlightAll();
  }, []);

  const reviewCode = async () => {
    try {
      setLoading(true);
      setError("");
      setReview("");

      const response = await axios.post(
        "http://localhost:3000/ai/review",
        { code },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // ✅ Make sure backend returns { review: "..." }
      setReview(response.data.review || "No review received.");
    } catch (err) {
      console.error(err);
      setError("Failed to get code review. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={12}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 16,
              border: "1px solid #ddd",
              borderRadius: "5px",
              minHeight: "100%",
              width: "100%",
            }}
          />
        </div>

        {/* ✅ Proper button */}
        <button className="review" onClick={reviewCode} disabled={loading}>
          {loading ? "Reviewing..." : "Review"}
        </button>
      </div>

      <div className="right">
        {error && <p style={{ color: "red" }}>{error}</p>}

        {review && (
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        )}
      </div>
    </main>
  );
}

export default App;

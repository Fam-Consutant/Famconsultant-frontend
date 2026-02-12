"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";
import { IMAGES, ICONS } from "@/assets/images";
import { mcqApi } from "@/lib/api/mcq";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

// Function to download coupon as PNG
const downloadCoupon = async (userData, couponCode) => {
  try {
    // Create canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Load voucher background image using browser's native Image constructor
    const img = new window.Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw background image
      ctx.drawImage(img, 0, 0);

      // Configure text styling for Name
      ctx.fillStyle = "#ffffff"; // White color for text
      ctx.textAlign = "left";
      ctx.font = 'bold 28px "Futura LT Bold", Arial, sans-serif';

      // Draw Name (in the "Name : _ _ _ _ _" field)
      const fullName = `${userData.firstName || ""} ${
        userData.lastName || ""
      }`.trim();
      ctx.fillText(
        fullName,
        770, // X position - after "Name :" label
        730 // Y position - align with Name field
      );

      // Draw Phone (in the "Phone : _ _ _ _ _" field)
      ctx.fillText(
        userData.phoneNumber || "",
        770, // X position - after "Phone :" label
        820 // Y position - align with Phone field
      );

      // Draw Coupon Code (in red box area with white text)
      ctx.font = 'bold 32px "Futura LT Bold", Arial, sans-serif';
      ctx.fillStyle = "#FFFFFF"; // White color for coupon code
      ctx.textAlign = "center";
      ctx.fillText(
        couponCode,
        1280, // X position - centered in red coupon box
        820 // Y position - vertically centered in red box
      );

      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `FAM_Consultant_Voucher_${couponCode}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        toast.success("Coupon downloaded successfully!");
      }, "image/png");
    };

    img.onerror = () => {
      toast.error("Failed to load voucher template");
    };

    // Load the voucher background
    img.src = IMAGES.voucher;
  } catch (error) {
    console.error("Download error:", error);
    toast.error("Failed to download coupon");
  }
};

const MCQSTest = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // {questionId: selectedAnswer(1-4)}
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [initialTime, setInitialTime] = useState(600);
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);
  const [skippedQuestions, setSkippedQuestions] = useState([]);
  const [testCompleted, setTestCompleted] = useState(false);
  const [testSessionId, setTestSessionId] = useState(null);
  const [user, setUser] = useState(null);
  const [resultData, setResultData] = useState(null); // API submission result
  const [answersDetail, setAnswersDetail] = useState(null); // Detailed answers from result endpoint
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load session + questions on mount
  useEffect(() => {
    const id =
      typeof window !== "undefined"
        ? localStorage.getItem("testSessionId")
        : null;
    if (!id) {
      router.push("/ielts-pte");
      return;
    }
    setTestSessionId(id);
    (async () => {
      try {
        setLoading(true);

        // Check if test already completed by trying to get results
        try {
          const resultCheck = await mcqApi.getResult(id);
          if (resultCheck?.success && resultCheck?.data) {
            // Test already completed, clear session and redirect
            if (typeof window !== "undefined") {
              localStorage.removeItem("testSessionId");
            }
            toast.error(
              "This test has already been completed. Please register again to take a new test."
            );
            router.push("/ielts-pte");
            return;
          }
        } catch (err) {
          // 404 error means test not completed yet, continue loading
          if (err?.status === 404) {
            // This is expected, continue
          } else {
            console.log("Result check error:", err);
          }
        }

        // Fetch session for user display
        try {
          const sessionRes = await mcqApi.getSession(id);
          if (sessionRes?.success) setUser(sessionRes.data);
        } catch {}

        const qRes = await mcqApi.getTestQuestions();
        if (qRes?.success && Array.isArray(qRes.data)) {
          // Transform to UI model with options array
          // API returns: id, question, option1-4 (no text field)
          const formatted = qRes.data.map((q) => ({
            id: q.id,
            question: q.question,
            text: "", // API doesn't provide separate text field
            options: [q.option1, q.option2, q.option3, q.option4],
          }));
          setQuestions(formatted);
          setError(null);
        } else {
          const errorMsg = qRes?.message || "Failed to load questions";
          setError(errorMsg);
          toast.error(errorMsg);
        }
      } catch (err) {
        const msg =
          err?.payload?.message || err?.message || "Error loading questions";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !testCompleted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, testCompleted]);

  // Ensure results content becomes visible even though it's added after initial animations run
  useEffect(() => {
    if (testCompleted) {
      const resultsNodes = document.querySelectorAll(
        ".results-wrapper, .results-left-section, .results-right-section"
      );
      resultsNodes.forEach((node) => node.classList.add("in-view"));

      // Prevent browser back button after test completion
      if (typeof window !== "undefined") {
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
          window.history.pushState(null, "", window.location.href);
          toast.error(
            "Test completed. Please register again to take a new test."
          );
        };
      }
    }

    return () => {
      if (typeof window !== "undefined") {
        window.onpopstate = null;
      }
    };
  }, [testCompleted]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleAnswerSelect = (optionIndex) => {
    const q = questions[currentQuestion];
    if (!q) return;
    setSelectedAnswers((prev) => ({ ...prev, [q.id]: optionIndex + 1 }));
  };

  const handleSubmitAnswer = () => {
    const q = questions[currentQuestion];
    if (!q) return;

    if (selectedAnswers[q.id] !== undefined) {
      if (!attemptedQuestions.includes(currentQuestion)) {
        setAttemptedQuestions([...attemptedQuestions, currentQuestion]);
      }
      setSkippedQuestions(
        skippedQuestions.filter((q) => q !== currentQuestion)
      );
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    } else {
      toast.error("Please select an answer before submitting.");
    }
  };

  const handleSkip = () => {
    if (
      !skippedQuestions.includes(currentQuestion) &&
      !attemptedQuestions.includes(currentQuestion)
    ) {
      setSkippedQuestions([...skippedQuestions, currentQuestion]);
    }
    handleNext();
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmitTest = async () => {
    if (!testSessionId) return;
    // Validate all questions answered
    const answeredCount = Object.keys(selectedAnswers).length;
    try {
      setLoading(true);
      const answers = Object.entries(selectedAnswers).map(
        ([questionId, selectedAnswer]) => ({
          questionId,
          selectedAnswer,
        })
      );
      const res = await mcqApi.submitTest({ testSessionId, answers });
      if (res?.success) {
        setResultData(res.data);
        setTestCompleted(true);

        // Clear session from localStorage to prevent re-access
        if (typeof window !== "undefined") {
          localStorage.removeItem("testSessionId");
        }

        // Fetch detailed result for answers breakdown
        try {
          const detail = await mcqApi.getResult(testSessionId);
          if (detail?.success) setAnswersDetail(detail.data);
        } catch {}
      } else {
        toast.error(res?.message || "Submit failed");
      }
    } catch (err) {
      const msg = err?.payload?.message || err?.message || "Submit error";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestion(index);
  };

  const getQuestionStatus = (index) => {
    if (attemptedQuestions.includes(index)) {
      return "attempted";
    } else if (skippedQuestions.includes(index)) {
      return "skipped";
    } else if (index === currentQuestion) {
      return "current";
    }
    return "unattempted";
  };

  // Calculate results
  const timeTaken = initialTime - timeLeft;

  // Check if all questions are attempted or skipped
  const allQuestionsHandled = () => {
    const handledQuestions = new Set([
      ...attemptedQuestions,
      ...skippedQuestions,
    ]);
    return handledQuestions.size === questions.length;
  };

  const shouldShowSubmitButton =
    currentQuestion === questions.length - 1 || allQuestionsHandled();

  if (testCompleted && resultData) {
    return (
      <ResultsPage
        resultData={resultData}
        answersDetail={answersDetail}
        user={user}
        timeTaken={timeTaken}
      />
    );
  }

  if (loading) {
    return (
      <div className="mcqs-test-container animate-on-load">
        <div className="mcqs-test-wrapper animate-on-scroll">
          <div className="mcqs-left-section animate-on-scroll">
            <div className="mcqs-header">
              <h1>Loading Test Questions...</h1>
              <p>Please wait while we prepare your test.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="mcqs-test-container animate-on-load">
        <div className="mcqs-test-wrapper animate-on-scroll">
          <div className="mcqs-left-section animate-on-scroll">
            <div className="mcqs-header">
              <h1>No Questions Available</h1>
              <p>
                {error ||
                  "Unable to load test questions. Please try again later."}
              </p>
              <button
                className="btn btn-primary"
                onClick={() => router.push("/ielts-pte")}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mcqs-test-container animate-on-load">
      <div className="mcqs-test-wrapper animate-on-scroll">
        {/* Left Section - Question Content */}
        <div className="mcqs-left-section animate-on-scroll">
          {/* Header */}
          <div className="mcqs-header">
            <h1>Multiple Choice (Single)</h1>
            <p>
              Read the text and answer the multiple-choice question by selecting
              the correct response. Only one response is correct.
            </p>
          </div>

          {/* Question Number */}
          <div className="mcqs-question-number">
            <h2>Question no. {currentQuestion + 1}</h2>
          </div>

          {/* Question Passage */}
          <div className="mcqs-question-passage">
            <p>{questions[currentQuestion]?.question}</p>
          </div>

          {/* Question Text */}
          <div className="mcqs-question-text">
            <p>{questions[currentQuestion]?.text || ""}</p>
          </div>

          {/* Options */}
          <div className="mcqs-options">
            {questions[currentQuestion]?.options?.map((option, index) => (
              <div
                key={index}
                className={`mcqs-option ${
                  selectedAnswers[questions[currentQuestion]?.id] === index + 1
                    ? "mcqs-option-selected"
                    : ""
                }`}
                onClick={() => handleAnswerSelect(index)}
              >
                <div className="mcqs-option-label">
                  {String.fromCharCode(65 + index)}
                </div>
                <div className="mcqs-option-text">{option}</div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mcqs-actions">
            <button className="btn btn-primary" onClick={handleSubmitAnswer}>
              Submit Answer
            </button>
            <div className="mcqs-nav-buttons">
              <button className="btn btn-warning" onClick={handleSkip}>
                Skip
              </button>
              <button
                className="btn btn-success"
                onClick={shouldShowSubmitButton ? handleSubmitTest : handleNext}
              >
                {shouldShowSubmitButton ? "Submit Test" : "Next"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Section - User Info & Navigation */}
        <div className="mcqs-right-section ">
          {/* User Info */}
          <div className="mcqs-user-info">
            <div className="avatar-placeholder">
              <Image
                src={IMAGES.user_avatar}
                alt="User Avatar"
                width={50}
                height={50}
              />
            </div>
            <div className="mcqs-user-details">
              <h3>
                {user ? `${user.firstName} ${user.lastName}` : "Test Taker"}
              </h3>
              <p>{user?.email || ""}</p>
              <p>{user?.phoneNumber || ""}</p>
            </div>
          </div>

          {/* Timer */}
          <div className="mcqs-timer">
            <div className="timer-display">{formatTime(timeLeft)}</div>
            <p className="timer-label">Time left</p>
          </div>

          {/* Question Navigation */}
          <div className="mcqs-question-nav">
            {questions.map((_, index) => {
              const status = getQuestionStatus(index);
              return (
                <div
                  key={index}
                  className={`mcqs-nav-item mcqs-nav-${status}`}
                  onClick={() => handleQuestionClick(index)}
                >
                  <span>Question no {index + 1}</span>
                  {status === "attempted" && (
                    <FaCheckCircle size={24} className="status-icon" />
                  )}
                  {status === "skipped" && (
                    <Image
                      src={ICONS.skip}
                      alt="Skipped"
                      width={24}
                      height={24}
                      className="status-icon"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const ResultsPage = ({ resultData, answersDetail, user, timeTaken }) => {
  const router = useRouter();

  const handleGoBack = () => {
    // Ensure session is cleared before going back
    if (typeof window !== "undefined") {
      localStorage.removeItem("testSessionId");
    }
    router.push("/ielts-pte");
  };

  const formatTimeTaken = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };
  const scorePercentage = resultData?.score || 0;
  const eligibleForDiscount = !!resultData?.passed;
  const discountPercent = eligibleForDiscount ? 50 : 10;
  const couponCode = resultData?.couponCode;
  const correctAnswers = resultData?.correctAnswers || 0;
  const totalQuestions = resultData?.totalQuestions || 10;

  // Get answers array from either answersDetail or resultData, or create fallback
  const answersArray = Array.isArray(answersDetail?.answers)
    ? answersDetail.answers
    : Array.isArray(resultData?.answers)
    ? resultData.answers
    : Array.from({ length: totalQuestions }, (_, i) => ({
        isCorrect: i < correctAnswers,
      }));

  return (
    <div className="results-container animate-on-load">
      {/* Header */}
      <div className="results-header">
        <h1>
          {couponCode
            ? "You've Unlocked a Upto 10% Discount!"
            : "No Discount Available"}
        </h1>
        <p>
          {!couponCode
            ? "Score above 80% and enjoy a special discount on our PTE preparation course.."
            : "Complete more questions correctly to unlock higher discounts!"}
        </p>
      </div>

      <div className="results-wrapper animate-on-scroll">
        {/* Left Section - Score Card */}
        <div className="results-left-section animate-on-scroll">
          <div className="results-card">
            <h2>
              {eligibleForDiscount
                ? `Great Job, ${
                    user ? `${user.firstName} ${user.lastName}` : "Test Taker"
                  }`
                : `Good Attempt, ${
                    user ? `${user.firstName} ${user.lastName}` : "Test Taker"
                  }`}
            </h2>
            <p>
              {couponCode
                ? `You're eligible for a special discount on our PTE course.`
                : "You're not eligible for a special discount on our PTE course."}
            </p>

            {/* Score Display */}
            <div className="score-display">
              <svg viewBox="0 0 100 60" className="score-arc">
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  stroke={scorePercentage >= 80 ? "#10b981" : "#fbbf24"}
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(scorePercentage / 100) * 251} 251`}
                />
              </svg>
              <div className="score-text">{scorePercentage}%</div>
            </div>

            {/* Stats */}
            <div className="results-stats">
              <div className="stat-row">
                <span>Total Correct:</span>
                <span className="stat-value">{correctAnswers}</span>
              </div>
              <div className="stat-row">
                <span>Total Incorrect:</span>
                <span className="stat-value">
                  {Math.max(totalQuestions - correctAnswers, 0)}
                </span>
              </div>
              <div className="stat-row">
                <span>Time Taken:</span>
                <span className="stat-value">{formatTimeTaken(timeTaken)}</span>
              </div>
            </div>

            {/* Answer Feedback */}
            <div className="answer-feedback">
              {answersArray.map((ans, index) => (
                <div key={index} className="feedback-item">
                  {ans.isCorrect ? (
                    <Image
                      src={ICONS.tick_success}
                      className="feedback-icon correct"
                      width={24}
                      height={24}
                      alt="Correct"
                    />
                  ) : (
                    <Image
                      src={ICONS.tick_wrong}
                      className="feedback-icon incorrect"
                      width={24}
                      height={24}
                      alt="Incorrect"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Coupon & Details */}
        <div className="results-right-section ">
          {/* Trophy */}
          <div className="trophy-section">
            <div className="trophy-icon">
              <Image
                src={IMAGES.test_cup}
                alt="Trophy"
                width={150}
                height={150}
                className="trophy-image"
              />
            </div>
          </div>

          {/* Coupon Card */}
          <div className="coupon-card">
            <h3>Coupon Code</h3>
            <div className="coupon-code">
              {couponCode ? couponCode : "Not Applicable"}
            </div>

            {/* User Details */}
            <div className="results-stats">
              <div className="stat-row">
                <span>Name</span>
                <span className="stat-value">
                  {user ? `${user.firstName} ${user.lastName}` : "-"}
                </span>
              </div>
              <div className="stat-row">
                <span>Phone Number:</span>
                <span className="stat-value">{user?.phoneNumber || "-"}</span>
              </div>
              <div className="stat-row">
                <span>Email:</span>
                <span className="stat-value">{user?.email || "-"}</span>
              </div>
              <div className="stat-row">
                <span>Coupon Code:</span>
                <span className="stat-value">
                  {couponCode ? couponCode : "-"}
                </span>
              </div>
            </div>
            {/* Download Button */}

            {couponCode && (
              <button
                className="btn btn-primary coupon-btn"
                onClick={() => downloadCoupon(user, couponCode)}
              >
                Download Coupon
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCQSTest;

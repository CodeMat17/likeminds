import * as React from "react";

interface ContactEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  sentAt: string;
}

export function ContactEmail({ name, email, subject, message, sentAt }: ContactEmailProps) {
  return (
    <html lang="en">
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <meta charSet="UTF-8" />
        <title>New Contact Message – LikeMinds 1980–1986</title>
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: "#f4f4f0", fontFamily: "'Georgia', serif" }}>
        <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#f4f4f0", padding: "40px 16px" }}>
          <tbody>
            <tr>
              <td align="center">
                <table width="600" cellPadding={0} cellSpacing={0} style={{ maxWidth: "600px", width: "100%", backgroundColor: "#ffffff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
                  <tbody>

                    {/* Header */}
                    <tr>
                      <td style={{ background: "linear-gradient(135deg, #1a3a2a 0%, #2d5a3d 60%, #1a3a2a 100%)", padding: "36px 40px 28px", textAlign: "center" }}>
                        <div style={{ height: "3px", background: "linear-gradient(90deg, transparent, #c9a84c, transparent)", marginBottom: "24px", borderRadius: "2px" }} />
                        <h1 style={{ margin: 0, color: "#ffffff", fontSize: "20px", fontWeight: 700 }}>LikeMinds 1980–1986</h1>
                        <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.55)", fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>Age Grade · Nomeh Unateze</p>
                        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)", marginTop: "24px" }} />
                      </td>
                    </tr>

                    {/* Alert banner */}
                    <tr>
                      <td style={{ backgroundColor: "#c9a84c", padding: "12px 40px", textAlign: "center" }}>
                        <p style={{ margin: 0, color: "#1a3a2a", fontSize: "12px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" }}>
                          💬 New Contact Message
                        </p>
                      </td>
                    </tr>

                    {/* Body */}
                    <tr>
                      <td style={{ padding: "32px 40px 0" }}>
                        <p style={{ margin: "0 0 24px", color: "#444", fontSize: "14px", lineHeight: "1.7" }}>
                          A new message was submitted via the contact form on{" "}
                          <strong style={{ color: "#1a3a2a" }}>{sentAt}</strong>.
                        </p>

                        {/* Sender details */}
                        <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: "24px" }}>
                          <tbody>
                            <tr>
                              <td style={{ borderBottom: "2px solid #c9a84c", paddingBottom: "8px", marginBottom: "10px" }}>
                                <span style={{ fontSize: "11px", fontWeight: 700, color: "#1a3a2a", textTransform: "uppercase", letterSpacing: "1.5px" }}>
                                  👤&nbsp;&nbsp;Sender Details
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: "28px" }}>
                          <tbody>
                            <Row label="Name" value={name} highlight />
                            <Row label="Email" value={email} />
                            <Row label="Subject" value={subject} />
                          </tbody>
                        </table>

                        {/* Message */}
                        <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: "12px" }}>
                          <tbody>
                            <tr>
                              <td style={{ borderBottom: "2px solid #c9a84c", paddingBottom: "8px" }}>
                                <span style={{ fontSize: "11px", fontWeight: 700, color: "#1a3a2a", textTransform: "uppercase", letterSpacing: "1.5px" }}>
                                  💬&nbsp;&nbsp;Message
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: "32px" }}>
                          <tbody>
                            <tr>
                              <td style={{ backgroundColor: "#f9f9f7", border: "1px solid #e8e8e0", borderRadius: "8px", padding: "16px 20px", fontSize: "14px", color: "#333", lineHeight: "1.7", whiteSpace: "pre-wrap" }}>
                                {message}
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        {/* Reply CTA */}
                        <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: "36px" }}>
                          <tbody>
                            <tr>
                              <td align="center">
                                <a
                                  href={`mailto:${email}?subject=Re: ${encodeURIComponent(subject)}`}
                                  style={{ display: "inline-block", backgroundColor: "#1a3a2a", color: "#c9a84c", textDecoration: "none", fontSize: "13px", fontWeight: 700, letterSpacing: "1px", padding: "14px 36px", borderRadius: "6px", textTransform: "uppercase" }}
                                >
                                  Reply to {name} →
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* Motto band */}
                    <tr>
                      <td style={{ background: "linear-gradient(90deg, #1a3a2a 0%, #2d5a3d 50%, #1a3a2a 100%)", padding: "16px 40px", textAlign: "center" }}>
                        <p style={{ margin: 0, color: "#c9a84c", fontSize: "14px", fontStyle: "italic", fontWeight: 700 }}>
                          &ldquo;Ofu Obi Umunwanne&rdquo;
                        </p>
                      </td>
                    </tr>

                    {/* Footer */}
                    <tr>
                      <td style={{ padding: "20px 40px", backgroundColor: "#f9f9f7", borderTop: "1px solid #e8e8e0", textAlign: "center" }}>
                        <p style={{ margin: 0, fontSize: "11px", color: "#bbb" }}>
                          Sent automatically from the contact form at likemindsofficial.org
                        </p>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <tr>
      <td width="30%" style={{ padding: "9px 12px 9px 0", fontSize: "12px", color: "#888", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.8px", verticalAlign: "top", borderBottom: "1px solid #f0f0ec" }}>
        {label}
      </td>
      <td style={{ padding: "9px 0", fontSize: "14px", color: highlight ? "#1a3a2a" : "#333", fontWeight: highlight ? 700 : 400, verticalAlign: "top", borderBottom: "1px solid #f0f0ec" }}>
        {value}
      </td>
    </tr>
  );
}

import hashlib
import streamlit as st

# SHA-256 hashed demo credentials
# Username: "analyst" | Password: "demo2026"
# SHA256("demo2026") = 56002f23246ebec588e734c56e3e5cbb32ef0e74eeaa66bf434b7f8670bc261a
DEMO_USERS = {
    "analyst": hashlib.sha256("demo2026".encode("utf-8")).hexdigest()
}

def verify_credentials(username: str, password: str) -> bool:
    """Verify username and password against hashed store."""
    if not username or not password:
        return False
    username_clean = username.strip().lower()
    if username_clean not in DEMO_USERS:
        return False
    input_hash = hashlib.sha256(password.encode("utf-8")).hexdigest()
    return input_hash == DEMO_USERS[username_clean]

def login_user(username: str = "Analyst", is_guest: bool = False):
    """Set authentication session state variables."""
    st.session_state.authenticated = True
    st.session_state.user_label = "Guest" if is_guest else "Analyst"
    st.session_state.auth_error = False

def logout_user():
    """Clear authentication session state variables."""
    st.session_state.authenticated = False
    st.session_state.user_label = None
    st.session_state.auth_error = False
